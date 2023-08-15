import { Button, useToast } from "@chakra-ui/react";

function ToastExample() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: "Login Success",
          description: "you are entering the app now",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      }
    >
      Show Toast
    </Button>
  );
}

export default ToastExample;
