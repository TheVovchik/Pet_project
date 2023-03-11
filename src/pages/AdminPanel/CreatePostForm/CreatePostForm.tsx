/* eslint-disable no-plusplus */
import {
  Button, useToast, Textarea,
  Flex, FormLabel, IconButton,
  Input, Progress, Text, Menu,
  MenuButton, MenuItem, MenuList,
} from '@chakra-ui/react';
import React, {
  FC, useEffect, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  AddIcon,
  DeleteIcon,
  AttachmentIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import {
  collection, addDoc, getDocs, runTransaction, doc, deleteDoc,
} from 'firebase/firestore';
import { AppDispatch } from '../../../storage/store';
import * as postActions from '../../../storage/features/post';
import { useAppSelector } from '../../../storage/hooks';
import { colors } from '../../../style/colors';
import { dataBase, storage } from '../../../firebase/config';
import { ContentActions } from '../../../types/ContentActionsEnum';
import { Post } from '../../../types/Post';

type Props = {
  action: ContentActions;
};

type PostData = {
  id: string,
  body: Post,
};

export const CreatePostForm: FC<Props> = ({ action }) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [descr, setDescr] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [coverFiles, setCoverFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUpload, setIsUpload] = useState(false);
  const {
    title, coversUrl, id, descriptions,
  } = useAppSelector(store => store.post);
  const dispatch = useDispatch<AppDispatch>();
  const collectionRef = collection(dataBase, 'posts');

  const isUpdate = action === ContentActions.UPDATE_POST;
  const isDelete = action === ContentActions.REMOVE_POST;
  const toast = useToast();

  const clearFields = () => {
    dispatch(postActions.actions.resetFields());
  };

  const getData = async () => {
    await getDocs(collectionRef)
      .then((response) => {
        setPosts(response.docs.map((item) => {
          const onePost: PostData = {
            id: item.id,
            body: item.data() as Post,
          };

          return onePost;
        }));
      });
  };

  const handleCreatePost = async () => {
    await addDoc(collectionRef, {
      coversUrl,
      title,
      descriptions,
    })
      .then(() => {
        toast({
          title: 'SUCCESS',
          description: 'Data was added',
          status: 'success',
          duration: 2000,
          isClosable: false,
          variant: 'top-accent',
          position: 'top',
        });
        clearFields();
      })
      .catch((error) => {
        toast({
          title: 'ERROR',
          description: error.message,
          status: 'warning',
          duration: 2000,
          isClosable: false,
          variant: 'top-accent',
          position: 'top',
        });
      });
  };

  const handleUpdatePost = async () => {
    const docRef = doc(dataBase, 'posts', id);

    try {
      await runTransaction(dataBase, async (transaction) => {
        transaction.update(docRef, {
          coversUrl,
          title,
          descriptions,
        });
      });
      toast({
        title: 'SUCCESS',
        description: 'Transaction successfully committed!',
        status: 'success',
        duration: 2000,
        isClosable: false,
        variant: 'top-accent',
        position: 'top',
      });
    } catch (e) {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
        status: 'warning',
        duration: 2000,
        isClosable: false,
        variant: 'top-accent',
        position: 'top',
      });
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await deleteDoc(doc(dataBase, 'posts', postId));
      toast({
        title: 'SUCCESS',
        description: 'Transaction successfully committed!',
        status: 'success',
        duration: 2000,
        isClosable: false,
        variant: 'top-accent',
        position: 'top',
      });
    } catch (e) {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
        status: 'warning',
        duration: 2000,
        isClosable: false,
        variant: 'top-accent',
        position: 'top',
      });
    }

    getData();
  };

  const handlePostUpdateSelect = (post: PostData) => {
    dispatch(postActions.actions.setTitle(post.body.title));
    dispatch(postActions.actions.setCoverUrl(post.body.coversUrl));
    dispatch(postActions.actions.setDescription(post.body.descriptions));
    dispatch(postActions.actions.setPostId(post.id));
    setShowForm(true);
  };

  const handleSetPostCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];

        if (!file.type.includes('image/')) {
          return;
        }

        setCoverFiles(current => [...current, file]);

        const path = URL.createObjectURL(file);

        dispatch(postActions.actions.addCover(path));
      }
    }
  };

  const handleSetPostTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(postActions.actions.setTitle(e.target.value));
  };

  const handleSetPostDescr = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescr(e.target.value);
  };

  const addPostDescr = () => {
    if (descr) {
      dispatch(postActions.actions.addDescription(descr));
      setDescr('');
    }
  };

  const uploadFoto = () => {
    if (coverFiles.length > 0) {
      coverFiles.forEach(file => {
        setIsUpload(true);

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
        // eslint-disable-next-line max-len
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setUploadProgress(progress);
        },
        () => {
          toast({
            title: 'ERROR',
            description: 'Something went wrong',
            status: 'warning',
            duration: 2000,
            isClosable: false,
            variant: 'top-accent',
            position: 'top',
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setIsUpload(false);
            dispatch(postActions.actions.addCoverUrl(downloadURL));
            toast({
              title: 'SUCCESS',
              description: 'Photo successfully updated!',
              status: 'success',
              duration: 2000,
              isClosable: false,
              variant: 'top-accent',
              position: 'top',
            });
          });
        });
      });

      setCoverFiles([]);
      dispatch(postActions.actions.setCover());
    }
  };

  useEffect(() => {
    clearFields();

    if (isUpdate || isDelete) {
      getData();
      setShowForm(false);
    } else {
      setPosts([]);
      setShowForm(true);
    }
  }, [action]);

  return (
    <>
      {posts && (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Статті
          </MenuButton>
          <MenuList>
            {posts.map((post) => {
              return (
                <MenuItem key={post.id}>

                  <Text
                    borderRadius="0.375rem"
                    p="6px"
                    color="white"
                    mr="10px"
                    h="fit-content"
                    bg={colors.main}
                    whiteSpace="break-spaces"
                    _hover={{
                      bg: isUpdate ? 'grey' : colors.main,
                      color: isUpdate ? colors.main : 'white',
                      cursor: isUpdate ? 'pointer' : 'initial',
                    }}
                    onClick={isUpdate
                      ? () => handlePostUpdateSelect(post)
                      : () => {}}
                  >
                    {post.body.title}
                  </Text>

                  {isDelete && (
                    <IconButton
                      alignSelf="flex-end"
                      mr="14px"
                      color="white"
                      bg="darkred"
                      _hover={{
                        bg: 'red',
                      }}
                      aria-label="Call Segun"
                      size="sm"
                      onClick={
                        () => handleDeletePost(post.id)
                      }
                      icon={<DeleteIcon />}
                    />
                  )}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      ) }

      {showForm && (
        <Flex
          direction="column"
        >
          <FormLabel
            htmlFor="file-input"
            color="white"
            p="10px 20px"
            w="fit-content"
            bg={colors.main}
            display="flex"
            alignItems="center"
            gap="14px"
            borderRadius="0.375rem"
            cursor="pointer"
          >
            <AttachmentIcon />
            <Text>
              Завантажити фото
            </Text>

            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleSetPostCover}
              defaultValue=""
              multiple
              style={{
                display: 'none',
              }}
            />
          </FormLabel>

          {!isUpload && (
            <IconButton
              alignSelf="flex-end"
              mr="14px"
              color="white"
              bg={colors.main}
              _hover={{
                bg: 'grey',
                color: colors.main,
              }}
              aria-label="Call Segun"
              size="sm"
              isDisabled={coverFiles.length === 0}
              onClick={uploadFoto}
              icon={<AddIcon />}
            />
          )}
          {isUpload && <Progress hasStripe value={uploadProgress} />}

          <FormLabel htmlFor="title">
            <Text>
              Додати назву
            </Text>

            <Input
              type="text"
              id="title"
              onChange={handleSetPostTitle}
              value={title}
            />
          </FormLabel>

          <FormLabel htmlFor="title">
            <Text>
              Додати опис
            </Text>

            <Textarea
              placeholder=""
              size="sm"
              resize="vertical"
              rows={8}
              onChange={handleSetPostDescr}
              value={descr}
            />
          </FormLabel>

          <IconButton
            alignSelf="flex-end"
            mb="20px"
            mr="14px"
            color="white"
            bg={colors.main}
            _hover={{
              bg: 'grey',
              color: colors.main,
            }}
            aria-label="Call Segun"
            size="sm"
            isDisabled={descr.length === 0}
            onClick={addPostDescr}
            icon={<AddIcon />}
          />

          <Button
            type="button"
            color="white"
            mr="10px"
            bg={colors.main}
            _hover={{
              bg: 'grey',
              color: colors.main,
            }}
            onClick={isUpdate ? handleUpdatePost : handleCreatePost}
          >
            {isUpdate ? 'Оновити статтю' : 'Додати статтю'}
          </Button>
        </Flex>
      )}
    </>

  );
};
