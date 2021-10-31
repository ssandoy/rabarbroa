import { INTRO_ROUTE } from "../../routes/routes";
import React from "react";
import { useRouter } from "next/router";

const Logo = ({ width, height }) => {
  const router = useRouter();
  return (
    <svg
      onClick={() => router.push(INTRO_ROUTE)}
      width={width}
      height={height}
      viewBox="0 0 815 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.125 2.25H26.0703C33.4297 2.25 38.7266 3.77344 41.9609 6.82031C45.1953 9.86719 47.1406 15.0469 47.7969 22.3594C48.0781 25.3594 48.2188 30.0469 48.2188 36.4219C48.2188 42.75 47.375 48.0703 45.6875 52.3828C44.0469 56.6953 41.1172 59.4844 36.8984 60.75C39.9922 61.2656 42.3359 62.9062 43.9297 65.6719C45.5234 68.3906 46.6484 72.75 47.3047 78.75C47.9609 84.7031 48.2891 93.5859 48.2891 105.398C48.2891 117.164 48.6641 124.031 49.4141 126H34.9297C34.1797 124.5 33.8047 110.602 33.8047 84.3047C33.8047 75.4453 32.9375 70.3125 31.2031 68.9062C29.4688 67.4531 26.8438 66.7266 23.3281 66.7266L14.6797 66.2344V126H0.125V2.25ZM33.8047 32.5547C33.8047 23.0391 32.9375 17.5312 31.2031 16.0312C29.5156 14.5313 27.0547 13.7812 23.8203 13.7812H14.6797V55.5469H23.9609C26.7734 55.5469 28.8359 55.0078 30.1484 53.9297C31.4609 52.8516 32.3984 50.7891 32.9609 47.7422C33.5234 44.6953 33.8047 39.9141 33.8047 33.3984V32.5547Z"
        fill="#5D6956"
      />
      <path
        d="M109.292 2.25H126.8L147.261 126H133.55L130.034 102.375H107.605L104.37 126H90.5188L109.292 2.25ZM109.222 90.5625H128.206L118.433 25.1719H118.222L109.222 90.5625ZM192.022 2.25H214.381C223.709 2.25 230.038 4.38281 233.366 8.64844C236.741 12.8672 238.475 20.0156 238.569 30.0938V32.7656C238.569 40.0312 237.889 45.75 236.53 49.9219C235.17 54.0938 232.733 57.1172 229.217 58.9922C236.811 62.0859 240.608 72 240.608 88.7344V91.3359C240.467 103.711 238.592 112.594 234.983 117.984C231.373 123.328 225.116 126 216.209 126H192.022V2.25ZM225.983 86.625C225.983 78.6562 225.327 73.0781 224.014 69.8906C222.702 66.7031 220.123 65.1094 216.28 65.1094H206.577V114.258H215.506C219.631 114.258 222.397 112.641 223.803 109.406C225.256 106.172 225.983 100.008 225.983 90.9141V86.625ZM224.155 30.3047C224.155 30.1641 224.155 30.0234 224.155 29.8828C224.155 21.6328 222.725 16.7578 219.866 15.2578C218.459 14.5078 216.42 14.1328 213.748 14.1328H206.577V53.9297H214.803C217.616 53.9297 219.608 53.4844 220.78 52.5938C221.998 51.6562 222.866 49.8281 223.381 47.1094C223.897 44.3906 224.155 39.9375 224.155 33.75V30.3047ZM299.923 2.25H317.431L337.892 126H324.181L320.666 102.375H298.236L295.002 126H281.15L299.923 2.25ZM299.853 90.5625H318.837L309.064 25.1719H308.853L299.853 90.5625ZM381.528 2.25H407.473C414.833 2.25 420.13 3.77344 423.364 6.82031C426.598 9.86719 428.544 15.0469 429.2 22.3594C429.481 25.3594 429.622 30.0469 429.622 36.4219C429.622 42.75 428.778 48.0703 427.091 52.3828C425.45 56.6953 422.52 59.4844 418.302 60.75C421.395 61.2656 423.739 62.9062 425.333 65.6719C426.927 68.3906 428.052 72.75 428.708 78.75C429.364 84.7031 429.692 93.5859 429.692 105.398C429.692 117.164 430.067 124.031 430.817 126H416.333C415.583 124.5 415.208 110.602 415.208 84.3047C415.208 75.4453 414.341 70.3125 412.606 68.9062C410.872 67.4531 408.247 66.7266 404.731 66.7266L396.083 66.2344V126H381.528V2.25ZM415.208 32.5547C415.208 23.0391 414.341 17.5312 412.606 16.0312C410.919 14.5313 408.458 13.7812 405.223 13.7812H396.083V55.5469H405.364C408.177 55.5469 410.239 55.0078 411.552 53.9297C412.864 52.8516 413.802 50.7891 414.364 47.7422C414.927 44.6953 415.208 39.9141 415.208 33.3984V32.5547ZM478.531 2.25H500.891C510.219 2.25 516.547 4.38281 519.875 8.64844C523.25 12.8672 524.984 20.0156 525.078 30.0938V32.7656C525.078 40.0312 524.398 45.75 523.039 49.9219C521.68 54.0938 519.242 57.1172 515.727 58.9922C523.32 62.0859 527.117 72 527.117 88.7344V91.3359C526.977 103.711 525.102 112.594 521.492 117.984C517.883 123.328 511.625 126 502.719 126H478.531V2.25ZM512.492 86.625C512.492 78.6562 511.836 73.0781 510.523 69.8906C509.211 66.7031 506.633 65.1094 502.789 65.1094H493.086V114.258H502.016C506.141 114.258 508.906 112.641 510.312 109.406C511.766 106.172 512.492 100.008 512.492 90.9141V86.625ZM510.664 30.3047C510.664 30.1641 510.664 30.0234 510.664 29.8828C510.664 21.6328 509.234 16.7578 506.375 15.2578C504.969 14.5078 502.93 14.1328 500.258 14.1328H493.086V53.9297H501.312C504.125 53.9297 506.117 53.4844 507.289 52.5938C508.508 51.6562 509.375 49.8281 509.891 47.1094C510.406 44.3906 510.664 39.9375 510.664 33.75V30.3047ZM573.144 2.25H599.089C606.448 2.25 611.745 3.77344 614.98 6.82031C618.214 9.86719 620.159 15.0469 620.816 22.3594C621.097 25.3594 621.237 30.0469 621.237 36.4219C621.237 42.75 620.394 48.0703 618.706 52.3828C617.066 56.6953 614.136 59.4844 609.917 60.75C613.011 61.2656 615.355 62.9062 616.948 65.6719C618.542 68.3906 619.667 72.75 620.323 78.75C620.98 84.7031 621.308 93.5859 621.308 105.398C621.308 117.164 621.683 124.031 622.433 126H607.948C607.198 124.5 606.823 110.602 606.823 84.3047C606.823 75.4453 605.956 70.3125 604.222 68.9062C602.487 67.4531 599.862 66.7266 596.347 66.7266L587.698 66.2344V126H573.144V2.25ZM606.823 32.5547C606.823 23.0391 605.956 17.5312 604.222 16.0312C602.534 14.5313 600.073 13.7812 596.839 13.7812H587.698V55.5469H596.98C599.792 55.5469 601.855 55.0078 603.167 53.9297C604.48 52.8516 605.417 50.7891 605.98 47.7422C606.542 44.6953 606.823 39.9141 606.823 33.3984V32.5547ZM667.616 35.8594C667.616 21.7969 670.147 12.1406 675.209 6.89062C679.194 2.76562 684.983 0.703125 692.577 0.703125C703.639 0.703125 710.717 5.25 713.811 14.3438C715.639 19.7344 716.553 26.9062 716.553 35.8594V90.4219C716.553 103.312 714.748 112.711 711.139 118.617C707.53 124.477 701.202 127.406 692.155 127.406C683.155 127.406 676.803 124.453 673.1 118.547C669.444 112.641 667.616 103.266 667.616 90.4219V35.8594ZM701.998 35.0156C701.998 27.0938 701.366 21.4922 700.1 18.2109C698.834 14.8828 696.28 13.2188 692.436 13.2188C688.592 13.2188 685.92 14.9062 684.42 18.2812C682.92 21.6562 682.17 27.2109 682.17 34.9453V90.5625C682.17 99.9844 682.827 106.406 684.139 109.828C685.452 113.203 688.1 114.891 692.084 114.891C696.069 114.891 698.717 113.18 700.03 109.758C701.342 106.289 701.998 99.8906 701.998 90.5625V35.0156ZM776.923 2.25H794.431L814.892 126H801.181L797.666 102.375H775.236L772.002 126H758.15L776.923 2.25ZM776.853 90.5625H795.838L786.064 25.1719H785.853L776.853 90.5625Z"
        fill="#5D6956"
      />
    </svg>
  );
};

export default Logo;