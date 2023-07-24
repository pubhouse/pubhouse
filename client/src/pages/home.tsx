/** @jsx jsx */

import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Heading, Box, Flex, Text, Button, jsx } from "theme-ui"

const Index: React.FC<{ user? }> = ({ user }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <React.Fragment>
      <Heading
        as="h1"
        sx={{
          fontSize: [5],
          lineHeight: 1.2,
          mt: [2, 5],
          mb: [3],
          maxWidth: "20em",
          width: ["90vw", null],
        }}
      >
        Collaboratively explore any domain
      </Heading>
      <Flex sx={{ mb: [4, null, 5] }}>
        <Box sx={{ flex: 3 }}>
          <Box sx={{ flex: 1 }}>
            <Text sx={{ my: 3 }}>
              Quest is a better way for community members to{" "}
              <Text sx={{ display: "inline" }}>learn about each other</Text>,{" "}
              <Text sx={{ display: "inline" }}>discover new ideas</Text>, and{" "}
              <Text sx={{ display: "inline" }}>build a foundation for effective governance</Text>.
            </Text>
            {user ? (
              <Box sx={{ mt: [6] }}>
                <Link sx={{ variant: "links.button" }} to="/conversations">
                  Go to conversations
                </Link>
              </Box>
            ) : (
              <Box sx={{ mt: [6] }}>
                <Link sx={{ variant: "links.button" }} to="/createuser">
                  Sign up
                </Link>
                <Text sx={{ display: "inline", my: [2], mx: [1], fontFamily: "monospace" }}>
                  {" "}
                  or{" "}
                </Text>
                <Link sx={{ variant: "links.button" }} to="/signin">
                  Sign in
                </Link>
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ flex: 2, display: ["none", "block"] }}>
          <img
            src="/cybernetics_transparent.png"
            sx={{
              maxWidth: 250,
              mt: [4],
              ml: [null, 4, 5],
            }}
          />
        </Box>
      </Flex>
    </React.Fragment>
  )
}

export default Index
