// import { Title, Text, Stack } from '@mantine/core';

// export default function Home() {
//   return (
//     <Stack>
//       <Title order={1}>¡Bienvenido a la app SocialAutomation!</Title>
//         <Text size="lg" weight={500}> Esta es la Home, próximamente podrás automatizar tus posteos en redes sociales. </Text>
//       <Text>
//         Esta es una aplicación creada con React y Mantine. Desde aquí vas a poder acceder al chat, ver información sobre el proyecto y contactarte con nosotros.
//       </Text>
//       <Text>
//         Usá la barra de navegación de arriba para moverte entre las distintas secciones.
//       </Text>
//     </Stack>
//   );
// }

import { Center, Stack, Title, Text } from "@mantine/core";

export default function Home() {
  return (
    <Center mih="70vh"> {/* centra vertical y horizontal */}
      <Stack align="center" gap="sm">
        <Title order={1} ta="center">
          ¡Bienvenido a la app SocialAutomation!
        </Title>
        <Text ta="left">
          Esta es la Home, próximamente podrás automatizar tus posteos en redes sociales.
        </Text>
        <Text ta="left">
          Esta es una aplicación creada con React y Mantine.
        </Text>
        <Text ta="left">
          Desde aquí vas a poder acceder al chat,
          ver información sobre el proyecto y contactarte con nosotros.
        </Text>
        <Text ta="left">
          Usá la barra de navegación de arriba para moverte entre las distintas secciones.
        </Text>
      </Stack>
    </Center>
  );
}