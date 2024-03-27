import { Entity } from '@acrd/types';
import MessageBox from '../message-box/message-box';
import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { previewImage } from '../../../store/ui';
import useFormat from '../../../hooks/use-format';
import striptags from 'striptags';
import { patterns } from '../../../types/lib/patterns.types';

interface MessageContentProps {
  message: Entity.Message;
}

const MessageContent: FunctionComponent<MessageContentProps> = ({ message }) => {
  const dispatch = useDispatch();
  const format = useFormat();
  const editingMessageId = useSelector((s: Store.AppState) => s.ui.editingMessageId);

  const messageHTML =
    ((message.content) ? format(message.content) : '') +
    ((message.updatedAt && message.content)
      ? `<span
          class="select-none muted edited text-xs ml-1"
          title="${message.updatedAt}">(edited)</span>`
      : '');

  const imageTypes = ['.png', '.jpg', '.gif', '.jpeg', '.webp', '.svg'];
  const Attachments: React.FunctionComponent = () => 
    message.attachmentURLs?.some(url => !imageTypes.some(ext => url.endsWith(ext)))
      ? <>{message.attachmentURLs?.map(fileURL =>
          <a key={fileURL}
            target='_blank'
            href={process.env.REACT_APP_CDN_URL + fileURL}
            className='rounded-lg bg-bg-tertiary p-1 w-24'>
              {fileURL.replace(/\/upload\/[0-9A-Za-z]{23,27}/, '')}
          </a>)}
        </>
      : <>{message.attachmentURLs?.map(imageURL =>
          <img
            key={imageURL}
            style={{ maxWidth: '384px', maxHeight: '384px' }}
            className="my-2 cursor-pointer"
            onClick={() => dispatch(previewImage(imageURL))}
            src={process.env.REACT_APP_CDN_URL + imageURL}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `${process.env.REACT_APP_CDN_URL}/images/image-not-found.png`;
            }} />)}
        </>;

  return (editingMessageId === message.id)
    ? <MessageBox content={message.content} />
    : <div className="relative">
      <div
        style={{ maxWidth: '963px' }}
        className="normal whitespace-pre-wrap">
        <div
          dangerouslySetInnerHTML={{ __html: messageHTML }}
          className="overflow-auto"
          style={{ maxWidth: '100%' }} />
        <Attachments />
      </div>
    </div>;
}

export default MessageContent;