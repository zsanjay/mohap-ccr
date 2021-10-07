// import { Injectable, OnInit } from "@angular/core";

// @Injectable({
//     providedIn: 'root'
//   })
// export class AutoRefresh implements OnInit{
   
//     ngOnInit(): void {
//         let time = new Date().getTime();
//         const setActivityTime = (e : any) => {
//           time = new Date().getTime();
//         }
//         document.body.addEventListener("mousemove", setActivityTime);
//         document.body.addEventListener("keypress", setActivityTime);
        
//         const refresh = () => {
//           if (new Date().getTime() - time >= 60000) {
//             window.location.reload(true);
//           } else {
//             setTimeout(refresh, 10000);
//           }
//         }
        
//         setTimeout(refresh, 10000);
//     }
// }