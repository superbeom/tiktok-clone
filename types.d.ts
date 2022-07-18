export interface User {
  _id: string;
  _type: string;
  userName: string;
  image: string;
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
  postedBy: User;
  likes: User[];
  comments: {
    comment: string;
    _key: string;
    postedBy: User;
  }[];
}
