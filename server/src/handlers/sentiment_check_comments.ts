import { Request, Response } from "express";
import { queryP_readOnly } from "../db/pg-query";
import fail from "../utils/fail";


export async function handle_GET_conversation_sentiment_comments (req: Request, res: Response) {
  // make sure that this query does not return the zid
  const query = `
  SELECT
    scc.comment,
    scc.created,
    scc.id,
    scc.uid,
    u.github_username
  FROM
    sentiment_check_comments as scc
  JOIN
    users u
  ON
    u.uid = scc.uid
  WHERE
    scc.zid = $1
  ORDER BY
    scc.created ASC;
  `;

  let result;
  try {
    result = await queryP_readOnly(query.toString(), [req.p.zid]);
  } catch (err) {
    fail(res, 500, "polis_err_get_conversation_sentiment_comments", err);
    return;
  }

  res.status(200).json(result);
}

export async function handle_POST_conversation_sentiment_check_comments (req: Request, res: Response) {
  const query = "INSERT INTO sentiment_check_comments (zid, uid, comment) VALUES ($1, $2, $3) RETURNING *;";

  let result;
  try {
    result = await queryP_readOnly(query.toString(), [req.p.zid, req.p.uid, req.p.comment]);
  } catch (err) {
    fail(res, 500, "polis_err_post_conversation_sentiment_check_comments", err);
    return;
  }

  res.status(201).json(result);
}

export async function handle_DELETE_conversation_sentiment_check_comments (req: Request, res: Response) {
  const selectQuery = "SELECT zid, uid, comment FROM sentiment_check_comments WHERE id = $1;";

  let comments;
  try {
    comments = await queryP_readOnly(selectQuery.toString(), [req.p.comment_id]);
  } catch (err) {
    fail(res, 500, "polis_err_delete_conversation_sentiment_check_comments", err);
    return;
  }

  if(comments.length == 0) {
    fail(res, 404, "polis_err_delete_conversation_sentiment_check_comments", "sentiment check comment not found");
    return;
  }
  const comment = comments[0]

  if(comment.uid !== req.p.uid) {
    fail(res, 403, "polis_err_delete_conversation_sentiment_check_comments", "user not authorized to delete this comment");
    return;
  }

  const deleteQuery = "DELETE FROM sentiment_check_comments WHERE id = $1;";
  try {
    await queryP_readOnly(deleteQuery.toString(), [req.p.comment_id]);
  } catch (err) {
    fail(res, 500, "polis_err_delete_conversation_sentiment_check_comments", err);
    return;
  }

  res.status(200).json(`comment with id ${req.p.comment_id} deleted`);
}
