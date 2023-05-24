import { Post } from '@/typings';
import PromptCard from './PromptCard';

interface IPromptCardList {
    data: Post[];
    handleTagClick: (tag: string) => void;
}

const PromptCardList = ({ data, handleTagClick }: IPromptCardList) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map(post => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

export default PromptCardList;
