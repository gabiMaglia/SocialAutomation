'use client';

import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { PostData } from '@/types/postData';

interface CustomModalProps {
  title?: string;
  renderContent: (data: PostData) => React.ReactNode;
}

export const usePostModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState<PostData | null>(null);

  const openModal = (post: PostData) => {
    setData(post);
    open();
  };

  const ModalWrapper = ({ renderContent }: Pick<CustomModalProps, 'renderContent'>) => (
    <Modal
      opened={opened}
      onClose={close}
      size="xl"
      title={data?.title || 'Post'}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      {data && renderContent(data)}
    </Modal>
  );

  return {
    openModal,
    Modal: ModalWrapper,
  };
};
