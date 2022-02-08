import {
  EmailShareButton,
  FacebookShareButton,
  PocketShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  PocketIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";

const Share = ({ answers }) => {
  const title = "Twenty-Eight, Your Daily Numbers Game";
  const url = "http://twenty-eight.robowenking.com/";
  const iconSize = 48;

  return (
    <div className="text-page">
      <h2>Share</h2>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={iconSize} round />
      </TwitterShareButton>
      <FacebookShareButton url={url} title={title}>
        <FacebookIcon size={iconSize} round />
      </FacebookShareButton>
      <EmailShareButton url={url} title={title}>
        <EmailIcon size={iconSize} round />
      </EmailShareButton>
      <PocketShareButton url={url} title={title}>
        <PocketIcon size={iconSize} round />
      </PocketShareButton>
      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={iconSize} round />
      </TelegramShareButton>
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={iconSize} round />
      </WhatsappShareButton>
    </div>
  );
}

export default Share;
