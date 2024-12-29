import CreatStory from './CreateStory';
import StoryItem from './StoryItem';
import { appwriteService } from '@/appWrite/appwriteService';
const StoryListContainer = async () => {
  const stories = await appwriteService.getStories();
  return (
    <div className=' flex gap-2 overflow-auto p-2 max-h-[170px] md:max-h-none min-h-[150px]'>
      <CreatStory />
      {stories.map((item, index) => (
        <StoryItem
          key={index}
          {...item}
        />
      ))}
    </div>
  );
};

export default StoryListContainer;
