import { useRouter } from 'next/router';
import EditPost from '../../blog-fe/pages/EditPost';

const EditPostPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  if (!postId) {
    return <div>Loading...</div>;
  }

  const postIdString = Array.isArray(postId) ? postId[0] : postId;
  return <EditPost postId={postIdString} />;
};

export default EditPostPage;
