'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActionIcon,
  Card,
  Group,
  Image,
  Loader,
  Modal,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import CtaButton from '@/components/common/cta-button';

export type CloudinaryImage = { url: string; publicId?: string };

type Props = {
  value?: CloudinaryImage | null;
  onChange: (val: CloudinaryImage | null) => void;
  folder?: string;
  label?: string;
};

export default function CloudinaryImagePicker({
  value,
  onChange,
  folder,
  label = 'Imagen',
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);
  const [library, setLibrary] = useState<CloudinaryImage[]>([]);
  const [loadingLib, setLoadingLib] = useState(false);

  const hasSelection = !!value?.url;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* -------- helpers -------- */

  const pickFromLibrary = useCallback(async () => {
    setLoadingLib(true);
    try {
      const qs = folder ? `?folder=${encodeURIComponent(folder)}` : '';
      const res = await fetch(`/api/cloudinary/list${qs}`, { cache: 'no-store' });
      const data = await res.json();
      setLibrary((data.items ?? []) as CloudinaryImage[]);
    } catch (e) {
      console.error('[cloudinary/list] error', e);
    } finally {
      setLoadingLib(false);
    }
  }, [folder]);

  const handleOpenLibrary = useCallback(async () => {
    setBrowseOpen(true);
    await pickFromLibrary();
  }, [pickFromLibrary]);

  const handleUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        /* 1) firma */
        const resSign = await fetch('/api/cloudinary/sign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folder }),
        });
        const { timestamp, signature, apiKey, cloudName, folder: resolvedFolder } =
          await resSign.json();

        /* 2) subida directa */
        const form = new FormData();
        form.append('file', file);
        form.append('api_key', apiKey);
        form.append('timestamp', String(timestamp));
        form.append('signature', signature);
        form.append('folder', resolvedFolder);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
          { method: 'POST', body: form },
        );
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadJson?.error?.message || 'Upload failed');

        onChange({ url: uploadJson.secure_url, publicId: uploadJson.public_id });
      } catch (e) {
        console.error('[cloudinary/upload] error', e);
      } finally {
        setUploading(false);
      }
    },
    [folder, onChange],
  );

  const onFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) handleUpload(f);
      e.currentTarget.value = ''; // reset
    },
    [handleUpload],
  );

  const triggerFileDialog = () => fileInputRef.current?.click();

  /* -------- vista selección -------- */

  const selectedCard = useMemo(() => {
    if (!hasSelection) return null;

    return (
      <Card withBorder shadow="sm" radius="md">
        <Card.Section>
          <Image src={value!.url} alt="Seleccionada" fit="cover" height={220} />
        </Card.Section>
        <Group justify="space-between" mt="sm">
          <Stack gap={2}>
            <Text size="sm" fw={600}>
              {label}
            </Text>
            <Text size="xs" c="dimmed" lineClamp={1}>
              {value!.url}
            </Text>
          </Stack>
          <Tooltip label="Quitar selección (no borra en Cloudinary)">
            <ActionIcon variant="light" color="red" onClick={() => onChange(null)}>
              <IconTrash size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Card>
    );
  }, [hasSelection, label, onChange, value]);

  /* -------- render -------- */

  return (
    <Stack gap="sm">
      <Group gap="sm">
        {/* Subir imagen */}
        <CtaButton
          text={uploading ? 'Subiendo…' : 'Subir imagen'}
          disabled={uploading}
          onClick={triggerFileDialog}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onFileInput}
        />

        {/* Mis fotos */}
        <CtaButton text="Mis fotos" onClick={handleOpenLibrary} />
      </Group>

      {selectedCard}

      {!hasSelection && (
        <Text size="sm" c="dimmed">
          Aún no seleccionaste imagen.
        </Text>
      )}

      {/* Modal biblioteca */}
      <Modal
        opened={browseOpen}
        onClose={() => setBrowseOpen(false)}
        title="Seleccionar de mis fotos"
        size="lg"
        centered
      >
        <Group justify="space-between" mb="sm">
          <Text size="sm" c="dimmed">
            Elegí una imagen ya subida a Cloudinary
          </Text>
          <CtaButton
            text={loadingLib ? 'Actualizando…' : 'Actualizar'}
            onClick={pickFromLibrary}
            disabled={loadingLib}
           
          />
        </Group>

        <ScrollArea h={420}>
          {loadingLib ? (
            <Group justify="center" py="xl">
              <Loader />
            </Group>
          ) : (
            <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm">
              {library.map((it) => (
                <Card
                  key={it.publicId ?? it.url}
                  withBorder
                  shadow="xs"
                  radius="md"
                  onClick={() => {
                    onChange(it);
                    setBrowseOpen(false);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Section>
                    <Image src={it.url} alt={it.publicId ?? 'image'} height={120} fit="cover" />
                  </Card.Section>
                  <Text size="xs" mt={4} lineClamp={2}>
                    {it.publicId ?? it.url}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </ScrollArea>
      </Modal>
    </Stack>
  );
}
