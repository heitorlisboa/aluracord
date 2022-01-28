import type { FC } from "react";
import styles from "./ChannelList.module.scss";

import Channel from "../Channel";

interface ChannelListProps {
  categoryName: string;
  channelList?: string[];
}

const ChannelList: FC<ChannelListProps> = ({ categoryName, channelList }) => {
  return (
    <ul className={styles.list} aria-label={`${categoryName} (categoria)`}>
      <h2 className={styles.title} aria-hidden="true">{categoryName}</h2>
      {channelList?.map((channelName, index) => (
        <Channel key={index} title={channelName} />
      ))}
    </ul>
  );
};

export default ChannelList;
