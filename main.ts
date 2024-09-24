import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const accessToken = process.env.ACCESS_TOKEN;
const instagramAccountId = process.env.INSTAGRAM_ACCOUNT_ID;
const imageUrl = 'imageUrl.jpg'; 
const caption = 'here is my automatic post';

async function uploadPhoto(imageUrl: string, caption: string) {
  try {
    const uploadUrl = `https://graph.facebook.com/v12.0/${instagramAccountId}/media`;
    const uploadParams = {
      image_url: imageUrl, 
      caption: caption,
      access_token: accessToken,
    };

    const uploadResponse = await axios.post(uploadUrl, null, { params: uploadParams });
    const mediaId = uploadResponse.data.id;
    console.log(`Image loaded successful! media ID: ${mediaId}`);

    const publishUrl = `https://graph.facebook.com/v12.0/${instagramAccountId}/media_publish`;
    const publishParams = {
      creation_id: mediaId,
      access_token: accessToken,
    };

    const publishResponse = await axios.post(publishUrl, null, { params: publishParams });
    console.log(`Post published successful! ID do post: ${publishResponse.data.id}`);

  } catch (error: any) {
    console.error('Instagram post failed:', error.response?.data || error.message);
  }
}

uploadPhoto(imageUrl, caption);
