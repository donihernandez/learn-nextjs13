'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ChangeEvent, SetStateAction } from 'react';
import type { Post } from '@/typings';
import PromptCardList from './PromptCardList';
import useDebounce from '@/hooks/useDebounce';

enum SearchType {
    username = 'USERNAME',
    post = 'POST',
    tag = 'TAG',
}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [type, setType] = useState<SearchType>(SearchType.post);
    const [searchResults, setSearchResults] = useState<Post[]>([]);

    const debouncedSearch = useDebounce(searchText, 500);

    const handleSearchChange = () => {
        let filteredPosts: Post[] = [];

        if (debouncedSearch.toString().startsWith('@')) {
            setType(SearchType.username);
        }

        switch (type) {
            case 'USERNAME':
                let username = searchText.split('@')[1];
                filteredPosts = posts.filter(post =>
                    /* @ts-ignore-next-line */
                    post.creator.username.toString().includes(username),
                );
                break;
            case 'POST':
                filteredPosts = posts.filter(post =>
                    post.prompt.includes(searchText),
                );
                break;
            case 'TAG':
                filteredPosts = posts.filter(post =>
                    post.tag.includes(searchText),
                );
                break;
        }

        setSearchResults(filteredPosts);
    };

    const handleTagClick = (tag: string) => {
        setSearchText(tag);
        setType(SearchType.tag);

        handleSearchChange();
    };

    const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json();

        setPosts(data);
        setSearchResults(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        if (debouncedSearch !== '' && debouncedSearch.length > 2) {
            handleSearchChange();
        } else {
            setSearchResults(posts);
        }
    }, [debouncedSearch]);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    required
                    className="search_input peer"
                />
            </form>

            <PromptCardList
                data={searchResults}
                handleTagClick={handleTagClick}
            />
        </section>
    );
};

export default Feed;
