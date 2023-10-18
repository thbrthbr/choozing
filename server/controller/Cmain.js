exports.upload = async (req, res) => {
  try {
    let set = [];
    let files = Array.from(req.files);
    for (let i = 0; i < files.length; i++) {
      let obj = {
        img: files[i].filename,
        id: i + 1,
      };
      set.push(obj);
    }
    res.send({ status: '성공~', data: set });
  } catch (e) {
    console.log('error: ', e);
    res.send({ status: '실패' });
  }
};
