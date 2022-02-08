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
  const title = answers.length === 28 ? `I've done my 28 for today already! How about you?` : `I've got ${answers.length} so far today. How about you?`;
  const url = "http://twenty-eight.robowenking.com/";
  const iconSize = 46;

  return (
    <div className="text-page">
      <h2>Share</h2>
      <TwitterShareButton url={url} title={title} hashtags={["TwentyEight"]} related={["RobOwenKing"]}>
        <TwitterIcon size={iconSize} round />
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={title} hashtag="#TwentyEight">
        <FacebookIcon size={iconSize} round />
      </FacebookShareButton>
      <EmailShareButton url={url} subject="Have you tried this game?" body={`It's a simple daily numbers puzzle game. I've got ${answers.length} so far today. How about you?`}>
        <EmailIcon size={iconSize} round />
      </EmailShareButton>
      <PocketShareButton url={url} title="Twenty-Eight">
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
