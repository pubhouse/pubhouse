ALTER TABLE fip_versions ADD CONSTRAINT fip_versions_github_pr_id_unique UNIQUE (github_pr_id);