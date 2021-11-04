const axios = require('axios').default


exports.checkInfo = async (assetCode) => {
    var resultJson
    let urlSep31 = 'https://127.0.0.1:3000/sep31'
    // const result = await fetch(`${sendServer}/info`);
    axios.get(`${urlSep31}/info`)
    .then(async(result)=>{
      resultJson = result.data
    })
    .then(()=>{
  
      if (!resultJson.receive) {
        throw new Error("`/info` response needs a `receive` property");
      }
    
      const asset = resultJson.receive[assetCode];
    
      if (!asset) {
        throw new Error(
          `Could not find asset code ${assetCode} in \`/info\` response`,
        );
      }
    
      if (!asset.enabled) {
        throw new Error(`${assetCode} is not enabled for deposit`);
      }
    
     
    
      if (!asset.fields.transaction) {
        throw new Error("No `transaction` object specified in `fields`");
      }
    
      let senderType;
      let receiverType;
      let multipleSenderTypes;
      let multipleReceiverTypes;
    
      if (asset.sep12) {
        // Sender
        if (asset.sep12.sender?.types) {
          const _senderTypes = Object.keys(asset.sep12.sender.types);
    
          if (_senderTypes.length === 1) {
            senderType = _senderTypes[0];
    
            
          } else if (_senderTypes.length) {
            multipleSenderTypes = _senderTypes.map((s) => ({
              type: s,
              description: asset.sep12.sender.types[s].description,
            }));
    
            
          }
        }
    
        // Receiver
        if (asset.sep12.receiver?.types) {
          const _receiverTypes = Object.keys(asset.sep12.receiver.types);
    
          if (_receiverTypes.length === 1) {
            receiverType = _receiverTypes[0];
    
            
          } else if (_receiverTypes.length) {
            multipleReceiverTypes = _receiverTypes.map((r) => ({
              type: r,
              description: asset.sep12.receiver.types[r].description,
            }));
    
            
          }
        }
      } else {
        if (asset.sender_sep12_type) {
          senderType = asset.sender_sep12_type;
    
          
        }
    
        if (asset.receiver_sep12_type) {
          receiverType = asset.receiver_sep12_type;
    
          
        }
      }
    
    
      return {
        fields: asset.fields,
        senderType,
        receiverType,
        multipleSenderTypes,
        multipleReceiverTypes,
      };
  
    })
};