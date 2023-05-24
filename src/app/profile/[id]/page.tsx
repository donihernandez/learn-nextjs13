'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Post, User } from '@/typings';
import Profile from '@/components/Profile';

const UserProfile = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [user, setUser] = useState<User>();
    const params = useParams();

    const fetchPosts = async () => {
        const response = await fetch(
            /* @ts-ignore-next-line */
            `/api/users/${user._id}/posts`,
        );
        const data = await response.json();

        setPosts(data);
    };

    const getUser = async () => {
        const response = await fetch(`/api/users/${params.id}`);
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
        if (user?._id) {
            fetchPosts();
        }
    }, [user]);

    return (
        <Profile
            name={user?.username || ''}
            desc={`Welcome to ${user?.username} 
        personalized profile page`}
            data={posts}
        />
    );
};

export default UserProfile;
