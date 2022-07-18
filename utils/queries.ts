const user = `
  _id,
  userName,
  image
`;

const post = `
  _id,
  caption,
  video {
   asset -> {
     _id,
     url
   }
  },
  userId,
  postedBy -> {
    ${user}
  },
  likes[] -> {
    ${user}
  },
  comments[] {
    comment,
    _key,
    postedBy -> {
      ${user}
    }
  }
`;

export const allPostsQuery = () => {
  const query = `*[_type == "post"] | order(_createdAt desc) {
    ${post}
  }`;

  return query;
};

export const postDetailQuery = (postId: string | string[]) => {
  const query = `*[_type == "post" && _id == '${postId}'] {
    ${post}
  }`;

  return query;
};

export const searchPostsQuery = (searchTerm: string | string[]) => {
  const query = `*[_type == "post" && caption match '${searchTerm}*' || topic match '${searchTerm}*'] {
    ${post}
  }`;

  return query;
};

export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const allUsersQuery = () => {
  const query = `*[_type == "user"]`;

  return query;
};

export const userCreatedPostsQuery = (userId: string | string[]) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc) {
    ${post}
  }`;

  return query;
};

export const userLikedPostsQuery = (userId: string | string[]) => {
  const query = `*[_type == 'post' && '${userId}' in likes[]._ref ] | order(_createdAt desc) {
    ${post}
  }`;

  return query;
};

export const topicPostsQuery = (topic: string | string[]) => {
  const query = `*[_type == "post" && topic match '${topic}*'] {
    ${post}
  }`;

  return query;
};
