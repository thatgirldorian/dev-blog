import { useRouter } from 'next/router';
import EditPost from '../EditPostPage';

const EditPostPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  if (!postId) {
    return <div>Loading...</div>;
  }

  return <EditPost postId={postId} />;
};

export default EditPostPage;
