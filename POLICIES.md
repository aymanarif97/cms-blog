# Post Policy

CREATE POLICY "Public Read Posts" ON public.posts FOR SELECT USING (is_published = true);


# Comment policy


CREATE POLICY "Read comment of user" ON public.comments FOR SELECT USING (EXISTS(SELECT 1 FROM posts WHERE posts.id = comments.post_id));   