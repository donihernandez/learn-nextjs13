'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@/components/Form';
import { Post } from '@/typings';

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState<boolean | undefined>(false);
    const [post, setPost] = useState<Post>({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    /* @ts-ignore */
                    userId: session?.user.id,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    );
};

export default CreatePrompt;
