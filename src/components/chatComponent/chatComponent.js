import { Container } from "../styled/container.styled";
import { FormInput } from "../styled/formInput.styled";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { messagesRef, addMessage } from "../../firebase/firebaseConnection";
import { onSnapshot } from "firebase/firestore";
import { useAuth } from "../../store/useAuth";
import { v4 as uuidv4 } from "uuid";
import Message from "../message/message";

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const { userName, userImage, userIdLogged } = useAuth();
  const { register, handleSubmit, resetField } = useForm();

  const onSubmit = (data) => {
    resetField("message");
    addMessage("1heF8ElApQWjaRItKGQN", {
      userName,
      userImage,
      userId: userIdLogged,
      message: data.message,
      postId: uuidv4(),
    });
  };

  const renderMessages = (arr) => {
    if (arr.length === 0) {
      return <h5>"No messages found"</h5>;
    }

    return arr[0].map(({ postId, ...props }) => {
      return <Message key={postId} userIdLogged={userIdLogged} {...props} />;
    });
  };

  const elements = renderMessages(messages);

  useEffect(() => {
    const unSub = onSnapshot(messagesRef, { includeMetadataChanges: true }, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => [...doc.data().list]));
    });
    return unSub;
  }, []);

  return (
    <>
      <Container minh="85%" bc="null" minw="100%" fd="column" jc="flex-start" ai="flex-start" overflow="scroll">
        {elements}
      </Container>
      <Container minh="15%" bc="null" minw="100%">
        <FormInput onSubmit={handleSubmit(onSubmit)}>
          <textarea type="text" {...register("message", { required: true })} name="message" placeholder="Send a message..." />
          <button type="submit">SEND</button>
        </FormInput>
      </Container>
    </>
  );
}

export default ChatComponent;
