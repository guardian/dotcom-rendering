// import React from 'react';
//
// export const AmpScript: React.FC<{id: string, script: string}> = ({id, script}) => {
//     // TODO: remove data-ampdevmode from amp-script tag
//     return (
//         <div>
//             <amp-script id={id} script={`${id}_local-script`} data-ampdevmode={true} nodom={true} />
//             <script
//                 id={`${id}_local-script`}
//                 type='text/plain'
//                 target='amp-script'
//                 dangerouslySetInnerHTML={{ __html: script }}
//             />
//         </div>
//     )
// }
