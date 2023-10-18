import { Buffer } from "buffer";
import { useState } from "react";
import { create } from 'ipfs-http-client'

// const projectId = '...';
// const projectSecret = '...';
// const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const infuraApiKey = '2WsuR6tmm91Z0EHtpY9fsc3Kjls'
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: `Bearer ${infuraApiKey}`,
  }
});
const IfpsUpload = () => {
  const [file, setFile] = useState(null);
  const [urlArr, setUrlArr] = useState([]);
  const [ipfsImage, setIpfsImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await client.add(file);
      const url = `https://decentro.infura-ipfs.io/${created.path}`;
      console.log(url);
      setUrlArr((prev) => [...prev, url]);

      setIpfsImage(url);
    } catch (error) {
      console.log(error.message);
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(Buffer(reader.result));
    };
    e.preventDefault();
  };
return (
    <div className="bg-white p-4 flex justify-center items-center">
        <form onSubmit={handleSubmit}>
            <input type="file" name="data" onChange={retrieveFile} />
            <button type="submit"> Upload File</button>
        </form>
        <div className="display">
            {urlArr.length !== 0 ? (
                urlArr.map((el, index) => <img key={index} src={el} alt="nfts" />)
            ) : (
                <h3>Upload data</h3>
            )}
        </div>
        <div>
        </div>
      {ipfsImage && (
        <div className="ipfs-image">
          <img src={ipfsImage} alt="IPFS" />
        </div>
      )}
    </div>
);
};
export default IfpsUpload;
