export interface User {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

export interface PostedBy extends User {
  _ref: string;
  _type: string;
}

export interface Video {
  _id: string;
  caption: string;
  video: {
    asset: {
      _id: string;
      url: string;
    };
  };
  userId: string;
  postedBy: PostedBy;
  likes: PostedBy[];
  comments: {
    comment: string;
    _key: string;
    postedBy: PostedBy;
  }[];
}
