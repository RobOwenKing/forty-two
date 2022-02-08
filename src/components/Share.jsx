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
  const url = window.location.href;
  const iconSize = 48;

  return (
    <div className="text-page">
      <h2>Share</h2>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={iconSize} round />
      </TwitterShareButton>
    </div>
  );
}

export default Share;
