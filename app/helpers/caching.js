const path = '/images/';

export function getImage(srcImg) {
  const id = srcImg.id;

  //The URL is predestined, so I will define it here to make returning simple
  //const imgData = {image_url:path+id+'.jpg',image_url_small:path+id+'.jpg'};
  const imgData = srcImg;

  //Check if image in storage
  const hasLocalImg = checkImg(path + id + '.jpg');
  if (!hasLocalImg) {
    //If not, put the image in
    saveImg(path + id + '.jpg');
  }

  return imgData;
}

function checkImg(path) {
  return true;
}

async function saveImg(path, data) {
  return new Promise((callback) => {
    /*
        do the image saving stuff here
        */
    //.then(()=>{
    callback(true);
    //})
  });
}

export async function checkCache(key, query) {
  return undefined;
}

export async function addToCache(key, query, result) {
  return;
}
