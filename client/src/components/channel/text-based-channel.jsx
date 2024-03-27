import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, getChannelMessages } from '../../store/messages';
import Message from './message/message';
import MessageBox from './message-box/message-box';
import { useEffect, useRef, useState } from 'react';

const TextBasedChannel = () => {
  const dispatch = useDispatch();
  const channel = {}
  const guild = {}
  const messages = useSelector(getChannelMessages(channel.id));
  const [cachedContent, setCachedContent] = useState({});
  const messagesRef = useRef(null);
  const msgCount = useSelector((s) => s.entities.messages.total[channel.id]);

  const batchSize = 25;
  const loadedAllMessages = msgCount === messages.length;

  useEffect(() => {
    messagesRef?.current?.scroll({
      top: messagesRef.current?.scrollHeight,
    });
  }, [messages[messages.length - 1]]);

  useEffect(() => {
    const messageBox = document.querySelector('#messageBox');
    messageBox.focus();

    dispatch(fetchMessages(channel.id, batchSize));
  }, [channel.id]);

  const onScroll = (e) => {
    if (messagesRef.current.scrollTop > 0 || loadedAllMessages) return;

    const back = messages.length + batchSize;
    dispatch(fetchMessages(channel.id, back));
  }


  const LoadingIndicator = () => (
    <>
      Loading
    </>
  );

  return (
    <div className="h-full flex flex-col flex-grow">
      <div
        id="messages"
        ref={messagesRef}
        className="main-content bg-bg-primary overflow-auto mb-5 mr-1 mt-1 flex-grow"
        onScroll={onScroll}>
        <TextChannelHeader />
        <LoadingIndicator />
        {messages.map(m => <Message key={m.id} message={m} />)}
      </div>
      <MessageBox
        cachedContent={cachedContent}
        setCachedContent={setCachedContent} />
    </div>
  );
}

export default TextBasedChannel;