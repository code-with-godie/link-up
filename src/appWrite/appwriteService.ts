import {
  Account,
  AppwriteException,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from 'appwrite';
import { appwriteConfig } from './appConfig';
import {
  IFollowings,
  IMediaPost,
  ISms,
  ITextPost,
  Post,
  Story,
} from '@/typings/typing';
import { z } from 'zod';
import { schema } from '@/utils';
import { commentsFormatter, postFormatter, userFormatter } from '@/lib';
class AppWriteService {
  public client = new Client();
  private database;
  private storage;
  private account;
  constructor() {
    this.client
      .setEndpoint(appwriteConfig.appWriteEndPoint)
      .setProject(appwriteConfig.appWriteProject);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
    this.account = new Account(this.client);
  }
  async getUser() {
    let account = null;
    try {
      account = await this.account.get();
      if (account.$id) {
        const user = await this.getUserByAccountId(account.$id);
        return user;
      }
      return null;
    } catch (error) {
      if (error instanceof AppwriteException) {
        const err = error as AppwriteException;
        if (err.code === 401) {
          console.log('you got it', account);
        }
      } else {
        console.log('original', error);

        return null;
      }
    }
  }
  async getUserByAccountId(accountId: string) {
    try {
      const user = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        [Query.equal('accountId', accountId)]
      );
      return user.documents[0];
    } catch (error: unknown) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error.message);
        throw new Error(`Failed to get new arrivals: ${error.message}`);
      } else {
        throw new Error('Failed to get new arrivals due to an unknown error');
      }
    }
  }
  async getFeeds() {
    try {
      const loggedInUser = await this.getUser();
      console.log('found user feed', loggedInUser);

      if (loggedInUser) {
        console.log('personilizing posts');

        const user = userFormatter(loggedInUser);
        const following = user.followings;
        const friends = user.friends;
        let feeds: Post[] = [];
        let fastsUserIDS: string[] = [];
        if (following) {
          fastsUserIDS = [...following];
        }
        if (friends) {
          fastsUserIDS = [...friends, ...fastsUserIDS];
        }
        //case am following some users so personalize
        if (fastsUserIDS.length > 0) {
          const priorityPosts = await this.database.listDocuments(
            appwriteConfig.appWriteDatabase,
            appwriteConfig.appWritePostsCollectionID,
            [Query.equal('user', fastsUserIDS), Query.orderDesc('$createdAt')]
          );
          // if (priorityPosts.total < 30) {
          //   const otherUsersPosts = await this.database.listDocuments(
          //     appwriteConfig.appWriteDatabase,
          //     appwriteConfig.appWritePostsCollectionID,
          //     [
          //       Query.notEqual('user', [...fastsUserIDS, userID]),
          //       Query.orderDesc('$createdAt'),
          //     ]
          //   );
          //   feeds = [...feeds, ...postFormatter(otherUsersPosts.documents)];
          // }

          feeds = postFormatter(priorityPosts.documents);
          //case my personalized posts are very few
          if (feeds.length < 30) {
            const myPosts = await this.database.listDocuments(
              appwriteConfig.appWriteDatabase,
              appwriteConfig.appWritePostsCollectionID,
              [
                Query.equal('user', loggedInUser?.$id),
                Query.orderDesc('$createdAt'),
              ]
            );
            feeds = [...feeds, ...postFormatter(myPosts.documents)];
          }
          //case am following people who have not posted anything and i have not posted anything
          if (feeds.length === 0) {
            const res = await this.database.listDocuments(
              appwriteConfig.appWriteDatabase,
              appwriteConfig.appWritePostsCollectionID,
              [Query.orderDesc('$createdAt'), Query.limit(30)]
            );
            feeds = [...feeds, ...postFormatter(res.documents)];
          }
          return feeds;
          //case am not following any user so my posts are not personalized
        } else {
          console.log('unpersnolized posts');
          const res = await this.database.listDocuments(
            appwriteConfig.appWriteDatabase,
            appwriteConfig.appWritePostsCollectionID,
            [Query.orderDesc('$createdAt'), Query.limit(20)]
          );
          return postFormatter(res.documents);
        }
        //there is no user id
      } else {
        const res = await this.database.listDocuments(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWritePostsCollectionID,
          [Query.orderDesc('$createdAt'), Query.limit(20)]
        );
        return postFormatter(res.documents);
      }
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to get feeds: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to get new feeds due to an unknown error');
      }
    }
  }
  async getFollowingAccount(followings: string[] | undefined) {
    try {
      if (!followings) return [];
      if (followings.length === 0) return [];
      const res = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        [Query.equal('$id', followings)]
      );
      if (res.total > 0) {
        const followings: IFollowings[] = res.documents.map(item => ({
          profilePic: item?.profilePic,
          username: item?.username,
          $id: item.$id,
        }));
        return followings;
      }
      return [];
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to get feeds: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to get new feeds due to an unknown error');
      }
    }
  }
  async getFollowers(followers: string[] | undefined) {
    try {
      if (!followers) return [];
      if (followers.length === 0) return [];
      const res = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        [Query.equal('$id', followers)]
      );
      if (res.total > 0) {
        const followers: IFollowings[] = res.documents.map(item => ({
          profilePic: item?.profilePic,
          username: item?.username,
          $id: item.$id,
        }));
        return followers;
      }
      return [];
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to get feeds: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to get new feeds due to an unknown error');
      }
    }
  }
  async likePost(postID: string, userID: string) {
    try {
      const user = await this.database.getDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        userID
      );
      if (!user) return;
      const oldLiked = user.likedPost;
      let newLikes = [];
      let liked = false;
      if (oldLiked.some((item: string) => item === postID)) {
        liked = false;
        newLikes = oldLiked.filter((item: string) => item !== postID);
      } else {
        liked = true;
        newLikes = [...oldLiked, postID];
      }
      const newUser = await this.database.updateDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        userID,
        { likedPost: newLikes }
      );
      return { liked, user: userFormatter(newUser) };
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to get feeds: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to get new feeds due to an unknown error');
      }
    }
  }
  async savePost(postID: string, userID: string) {
    try {
      const user = await this.database.getDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        userID
      );
      if (!user) return;
      const oldSaves = user.saved;
      let newLikes = [];
      let saved = false;
      if (oldSaves.some((item: string) => item === postID)) {
        saved = false;
        newLikes = oldSaves.filter((item: string) => item !== postID);
      } else {
        saved = true;
        newLikes = [...oldSaves, postID];
      }
      const newUser = await this.database.updateDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        userID,
        { saved: newLikes }
      );
      return { newUser, saved };
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to get feeds: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to get new feeds due to an unknown error');
      }
    }
  }
  async getUsers(userID: string) {
    try {
      const res = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        [Query.notEqual('$id', userID)]
      );
      return res.documents;
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to get feeds: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to get new feeds due to an unknown error');
      }
    }
  }
  async getSuggestedAccounts(userID: string) {
    try {
      const userRes = await this.getUserById(userID);
      const user = userFormatter(userRes);
      if (!user) return [];
      // const followings = user?.followings;
      // const followers = user?.followers
      // const friends = user?.friends
      // let suggestIDS = [];
      //check for users that are following me and am not following them
      // if(suggestIDS.some())
      const res = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        [Query.notEqual('$id', userID), Query.orderDesc('followers')]
      );
      return res.documents;
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to get feeds: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to get new feeds due to an unknown error');
      }
    }
  }
  async getVideos() {
    try {
      const res = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWritePostsCollectionID,
        [Query.equal('postType', 'video'), Query.orderDesc('$createdAt')]
      );
      return postFormatter(res.documents);
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to get feeds: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to get new feeds due to an unknown error');
      }
    }
  }
  async getSaved(saved?: string[] | undefined) {
    try {
      if (!saved) return [];
      const res = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWritePostsCollectionID,
        [Query.equal('$id', saved), Query.orderDesc('$createdAt')]
      );
      return postFormatter(res.documents);
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to get feeds: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to get new feeds due to an unknown error');
      }
    }
  }
  async getAllUsers() {
    try {
      const userRes = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID
      );
      return userRes.documents;
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to get feeds: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to get new feeds due to an unknown error');
      }
    }
  }
  async getUserPost(userID: string) {
    try {
      const res = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWritePostsCollectionID,
        [Query.equal('user', userID), Query.orderDesc('$createdAt')]
      );
      return postFormatter(res.documents);
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to get feeds: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to get new feeds due to an unknown error');
      }
    }
  }
  async getStories() {
    try {
      const res = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteStoriesCollectionID
      );
      const stories: Story[] = res.documents.map(doc => ({
        user: doc?.user,
        type: doc?.type,
        bg: doc?.bg,
        text: doc?.text,
        url: doc?.url,
        expiresAt: doc?.expiresAt,
        imageID: doc?.imageID,
      }));
      return stories;
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to get feeds: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to get new feeds due to an unknown error');
      }
    }
  }
  async follow(userID: string | undefined, followID: string) {
    try {
      if (!userID) return null;
      const user = await this.getUserById(userID);
      const followUser = await this.getUserById(followID);
      if (!user || !followUser) {
        throw new Error('no user with the provied id');
      }
      if (!user?.followings?.includes(followID)) {
        const newUser = await this.database.updateDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteUsersCollectionID,
          user?.$id,
          { followings: [...user?.followings, followID] }
        );
        const follow = await this.database.updateDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteUsersCollectionID,
          followUser?.$id,
          { followers: [...followUser?.followers, userID] }
        );
        return { user: newUser, follow };
      } else {
        const newUser = await this.database.updateDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteUsersCollectionID,
          user?.$id,
          {
            followings: [
              ...user?.followings?.filter((item: string) => item !== followID),
            ],
          }
        );
        const follow = await this.database.updateDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteUsersCollectionID,
          followUser?.$id,
          {
            followers: [
              ...user?.followers?.filter((item: string) => item !== userID),
            ],
          }
        );
        return { user: newUser, follow };
      }
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to follow user: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to follow user due to an unknown error');
      }
    }
  }
  async acceptFriendRequest(userID: string, friendID: string) {
    try {
      const user = await this.getUserById(userID);
      const friend = await this.getUserById(friendID);
      if (!user || !friend) {
        throw new Error('no user with the provied id');
      }
      if (user?.friendRequest?.includes(friend.$id)) {
        const newfriendRequest = user?.friendRequest?.filter(
          (item: string) => item !== friendID
        );
        const newfriends = [...user?.friends, friendID];
        const newUser = await this.database.updateDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteUsersCollectionID,
          userID,
          {
            friends: newfriends,
            friendRequest: newfriendRequest,
          }
        );
        const anotherNewfriends = [...friend?.friends, userID];
        const newFriend = await this.database.updateDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteUsersCollectionID,
          friendID,
          {
            friends: anotherNewfriends,
          }
        );
        return {
          user: userFormatter(newUser),
          friend: userFormatter(newFriend),
        };
      }
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to follow user: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to follow user due to an unknown error');
      }
    }
  }
  async sendFriendRequest(userID: string, followID: string) {
    try {
      const user = await this.getUserById(userID);
      const followUser = await this.getUserById(followID);
      if (!user || !followUser) {
        throw new Error('no user with the provied id');
      }
      if (!followUser?.friendRequest?.includes(userID)) {
        const newUser = await this.database.updateDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteUsersCollectionID,
          followUser?.$id,
          { friendRequest: [...followUser?.friendRequest, userID] }
        );
        return newUser;
      } else {
        const newUser = await this.database.updateDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteUsersCollectionID,
          followUser?.$id,
          {
            friendRequest: [
              ...followUser?.friendRequest?.filter(
                (item: string) => item !== userID
              ),
            ],
          }
        );
        return newUser;
      }
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to follow user: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to follow user due to an unknown error');
      }
    }
  }
  async like(userID: string | undefined, likeID: string) {
    try {
      if (!userID) return null;
      const likeUser = await this.getUserById(likeID);
      if (!likeUser) {
        throw new Error('no user with the provied id');
      }
      if (!likeUser?.likes?.includes(userID)) {
        const newUser = await this.database.updateDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteUsersCollectionID,
          likeUser?.$id,
          { likes: [...likeUser?.likes, userID] }
        );
        return newUser;
      } else {
        const newUser = await this.database.updateDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteUsersCollectionID,
          likeUser?.$id,
          {
            likes: [
              ...likeUser?.likes?.filter((item: string) => item !== userID),
            ],
          }
        );
        return newUser;
      }
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to follow user: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to follow user due to an unknown error');
      }
    }
  }
  async sendComment(comment: {
    title: string;
    postID: string;
    user?: string;
    type: 'text' | 'video' | 'image';
  }) {
    try {
      const res = await this.database.createDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteCommentsCollectionID,
        ID.unique(),
        comment
      );
      return res;
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to send comment: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to send comment due to an unknown error');
      }
    }
  }
  async getPostComments(postID: string) {
    try {
      const res = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteCommentsCollectionID,
        [Query.equal('postID', postID), Query.orderDesc('$createdAt')]
      );
      return commentsFormatter(res.documents);
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to send comment: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to send comment due to an unknown error');
      }
    }
  }
  async createPost(post: ITextPost | IMediaPost, file: File | null) {
    try {
      if (post.postType === 'text') {
        const newPost = await this.database.createDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWritePostsCollectionID,
          ID.unique(),
          post
        );
        return newPost;
      } else {
        if (!file) throw new Error('no file found for upload');
        // eslint-disable-next-line no-var
        var image = await this.uploadFile(file);
        if (!image) throw new Error('image not uploaded');

        //get post image url
        // eslint-disable-next-line no-var
        var url = this.storage.getFileView(
          appwriteConfig.appWriteBucket,
          image.$id
        );

        //delete the images because it may be corrupted
        if (!url) {
          await this.deleteFile(image.$id);
          throw new Error('no image url');
        }
        const newPost = await this.database.createDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWritePostsCollectionID,
          ID.unique(),
          { ...post, url, imageID: image.$id }
        );
        return newPost;
      }
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to send comment: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to send comment due to an unknown error');
      }
    }
  }
  async createStory(
    story: {
      user: string;
      type: 'image' | 'video' | 'text';
      text?: string;
      bg?: string;
      expiresAt: Date;
    },
    file?: File
  ) {
    try {
      if (story.type === 'text') {
        const res = await this.database.createDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteStoriesCollectionID,
          ID.unique(),
          story
        );
        const newStory: Story = {
          user: res?.user,
          type: res?.type,
          bg: res?.bg,
          text: res?.text,
          url: res?.url,
          imageID: res?.imageID,
          expiresAt: res?.expiresAt,
        };
        return newStory;
      } else {
        if (!file) return;
        // eslint-disable-next-line no-var
        var image = await this.uploadFile(file);
        if (!image) throw new Error('image not uploaded');

        //get post image url
        // eslint-disable-next-line no-var
        var url = this.storage.getFileView(
          appwriteConfig.appWriteBucket,
          image.$id
        );

        //delete the images because it may be corrupted
        if (!url) {
          await this.deleteFile(image.$id);
          throw new Error('no image url');
        }
        const res = await this.database.createDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteStoriesCollectionID,
          ID.unique(),
          { ...story, url, imageID: image.$id }
        );
        const newStory: Story = {
          user: res?.user,
          type: res?.type,
          bg: res?.bg,
          text: res?.text,
          url: res?.url,
          imageID: res?.imageID,
          expiresAt: res?.expiresAt,
        };
        return newStory;
      }
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to create story: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to create story due to an unknown error');
      }
    }
  }
  async handleOnBoarding(userID: string) {
    try {
      await this.database.updateDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        userID,
        { showonBoarding: false }
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to handle onboarding: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to handle onboarding due to an unknown error');
      }
    }
  }
  async handleDelete(postID: string) {
    try {
      await this.database.deleteDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWritePostsCollectionID,
        postID
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to delete post: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to delete post due to an unknown error');
      }
    }
  }
  async blockUser(userID: string, blockID: string) {
    try {
      const res = await this.getUserById(userID);
      if (!res) throw new Error('no user with the provided id');
      const user = userFormatter(res);
      let blockedUser = user?.blockedUsers || [];
      let blocked: boolean = false;
      if (blockedUser?.includes(blockID)) {
        blockedUser = blockedUser.filter(item => item !== blockID);
        blocked = false;
      } else {
        blockedUser = [...blockedUser, blockID];
        blocked = true;
      }
      const newRes = await this.database.updateDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        userID,
        { blockedUsers: blockedUser }
      );
      return { user: userFormatter(newRes), blocked };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to delete post: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to delete post due to an unknown error');
      }
    }
  }
  async updateProfile(data: {
    userID: string | undefined;
    type: string;
    file: File | null;
  }) {
    try {
      if (!data.file || !data.userID) return;

      // eslint-disable-next-line no-var
      var image = await this.uploadFile(data.file);
      if (!image) throw new Error('image not uploaded');

      //get post image url
      // eslint-disable-next-line no-var
      var url = this.storage.getFilePreview(
        appwriteConfig.appWriteBucket,
        image.$id
      );

      //delete the images because it may be corrupted
      if (!url) {
        await this.deleteFile(image.$id);
      }
      const newUser = await this.database.updateDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        data.userID,
        { [data.type]: url }
      );
      return newUser;
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to send comment: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to send comment due to an unknown error');
      }
    }
  }
  async updateBio(userID: string | undefined, data: z.infer<typeof schema>) {
    try {
      if (!userID) return;
      const user = await this.database.updateDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        userID,
        { ...data }
      );
      if (user) {
        const newUser = userFormatter(user);
        return newUser;
      }
      return null;
    } catch (error) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to send comment: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to send comment due to an unknown error');
      }
    }
  }
  async uploadFile(file: File) {
    try {
      const uploadedFile = this.storage.createFile(
        appwriteConfig.appWriteBucket,
        ID.unique(),
        file
      );
      return uploadedFile;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to upload the file: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to upload the file due to an unknown error');
      }
    }
  }
  async deleteFile(id: string) {
    try {
      console.log('deleting a file');
      return await this.storage.deleteFile(appwriteConfig.appWriteBucket, id);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to delete the file: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to delete the file due to an unknown error');
      }
    }
  }
  getFilePreview(id: string) {
    try {
      console.log('getting file preview');
      return this.storage.getFilePreview(
        appwriteConfig.appWriteBucket,
        id,
        1000,
        1000,
        ImageGravity.Center,
        100
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to getFilePreview the file: ${error.message}`);
      } else {
        console.log(error);
        throw new Error(
          'Failed to getFilePreview the file due to an unknown error'
        );
      }
    }
  }
  async getRoomMesseges(roomID: string) {
    try {
      const messeges = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteMessegesCollectionID,
        [Query.equal('room', roomID)]
      );
      return messeges.documents;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to get room messages: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to get room messages due to an unknown error');
      }
    }
  }
  async getUserRooms(userID: string) {
    try {
      const rooms = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteRoomsCollectionID,
        [Query.contains('members', userID)]
      );
      return rooms.documents;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to get user rooms: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to get user rooms due to an unknown error');
      }
    }
  }
  async createRoom(members: string[]) {
    try {
      const room = await this.database.listDocuments(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteRoomsCollectionID,
        [
          Query.contains('members', members[0]),
          Query.contains('members', members[1]),
        ]
      );
      if (room.total === 0) {
        const newRoom = await this.database.createDocument(
          appwriteConfig.appWriteDatabase,
          appwriteConfig.appWriteRoomsCollectionID,
          ID.unique(),
          { members }
        );
        console.log('created a new room');
        return newRoom;
      } else {
        console.log('room alreday exists');
        return room.documents[0];
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to create room: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to create room due to an unknown error');
      }
    }
  }
  async createMessage(data: ISms) {
    try {
      const sms = await this.database.createDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteMessegesCollectionID,
        ID.unique(),
        data
      );
      return sms;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        throw new Error(`Failed to create room: ${error.message}`);
      } else {
        console.log(error);
        throw new Error('Failed to create room due to an unknown error');
      }
    }
  }
  async getUserById(userID: string) {
    try {
      const user = await this.database.getDocument(
        appwriteConfig.appWriteDatabase,
        appwriteConfig.appWriteUsersCollectionID,
        userID
      );
      return user;
    } catch (error: unknown) {
      // Narrowing down `error` to something that has a message
      if (error instanceof Error) {
        console.log(error.message);
        throw new Error(`Failed to get new arrivals: ${error.message}`);
      } else {
        throw new Error('Failed to get new arrivals due to an unknown error');
      }
    }
  }
}

export const appwriteService: AppWriteService = new AppWriteService();
