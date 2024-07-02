"use client";

import { SunOutlined } from '@ant-design/icons';
import { FaCloud, FaCloudShowersHeavy, FaCloudSun, FaCloudSunRain, FaGamepad, FaRegSnowflake } from 'react-icons/fa6';
import { FaBookOpen, FaRegDizzy, FaRegFrown, FaRegGrinSquint, FaRegGrinStars, FaRegHeart, FaRegMeh, FaRegSadTear, FaRegSmile, FaRegStar, FaRegSurprise, FaRegTired } from 'react-icons/fa';

/**
 * 일기장 날씨에 사용하는 아이콘
 */
export const iconsWeather = {
  "sun": <SunOutlined />,
  "cloudSun": <FaCloudSun />,
  "cloud": <FaCloud />,
  "rain": <FaCloudShowersHeavy />,
  "rainSun": <FaCloudSunRain />,
  "snow": <FaRegSnowflake />
}

/**
 * 일기장 느낌에 사용하는 아이콘
 */
export const iconsFeeling = {
  "grinStar": <FaRegGrinStars />,
  "grin": <FaRegGrinSquint />,
  "smile": <FaRegSmile />,
  "meh": <FaRegMeh />,
  "frown": <FaRegFrown />,
  "sad": <FaRegSadTear />,
  "surprise": <FaRegSurprise />,
  "dizzy": <FaRegDizzy />,
  "tired": <FaRegTired />,
  "heart": <FaRegHeart />,
  "star": <FaRegStar />,
  "book": <FaBookOpen />,
  "gamepad": <FaGamepad />
}