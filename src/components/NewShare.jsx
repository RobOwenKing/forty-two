import {
  EmailShareButton,
  FacebookShareButton,
  PocketShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  PocketIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const setTitle = (answers, possibles) => {
  if (possibles.every((e) => answers.includes(e))) {
    return "I've got them all today! How about you?";
  } else {
    const misseds = possibles.filter((e) => !answers.includes(e));
    const rand = Math.floor(Math.random() * misseds.length);
    return `Anyone made ${misseds[rand]} yet today?`;
  }
};

/**
 * @param {array.<number>} answers - Answers found by the user (values)
 * @param {array.<string|null>} answerDetails - Answers found by the user (equations, each with total index-1), else null. Expected length = 28
 */
const NewShare = ({ answers, possibles }) => {
  const title = setTitle(answers, possibles);
  const url = "http://twenty-eight.robowenking.com/";
  const iconSize = 46;

  return (
    <div className="text-page">
      <h2>Share</h2>
      <p className="italics text-page__p">{title}</p>
      <p
        className="clickable text-page__p"
        onClick={() => window.prompt("Press Ctrl+C to copy", title)}
      >
        Copy
      </p>
      <TwitterShareButton
        url={url}
        title={title}
        hashtags={["TwentyEight"]}
        related={["RobOwenKing"]}
      >
        <TwitterIcon size={iconSize} round />
      </TwitterShareButton>
      <FacebookShareButton url={url} hashtag="#TwentyEight">
        <FacebookIcon size={iconSize} round />
      </FacebookShareButton>
      <EmailShareButton
        url={url}
        subject="Have you tried this game?"
        body={`It's a simple daily numbers puzzle game. I've got ${answers.length} so far today. How about you?`}
      >
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
};

export default NewShare;
