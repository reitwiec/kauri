import { Path, Svg } from "react-native-svg"
import { kauriColors } from "../theme"
import {View} from 'react-native'

export const KauriLogo = ({textColor, flowerColor}:{textColor?:string, flowerColor?:string}) => {
    if(!textColor){
        textColor = kauriColors.primary.dark
    }

    if(!flowerColor){
        flowerColor = "#EBBC38"
    }

    return (
    <View style={{aspectRatio: 2370/727}}>
        <Svg width="100%" height="100%" viewBox="0 0 2370 727" fill="none">
        <Path fillRule="evenodd" clipRule="evenodd" d="M64.4714 32.0106C109.266 32.351 116.978 32.5779 122.875 34.2798C126.617 35.4144 133.195 38.024 137.618 40.0663C142.041 42.1086 149.639 46.874 154.629 50.6182C161.206 55.497 165.175 59.5816 168.918 65.2547C171.753 69.5662 175.042 75.3527 176.176 78.1893C177.196 81.0258 178.67 84.8835 179.351 86.6989C180.258 89.0815 180.825 141.047 181.279 263.698C181.846 426.175 181.959 437.521 183.887 441.038C184.908 442.967 186.949 445.463 188.423 446.371C189.784 447.392 193.413 448.073 196.589 448.073C199.877 448.073 203.846 447.279 205.888 446.144C207.929 445.009 233.105 422.431 261.797 395.881C290.601 369.331 325.984 337.221 340.386 324.514C354.902 311.806 371.573 297.396 377.47 292.517C384.047 286.958 392.213 281.512 398.45 278.335C404.12 275.612 412.966 272.208 418.296 270.96C425.667 269.144 430.544 268.691 438.822 268.918C449.369 269.371 450.163 269.598 460.936 275.044C469.328 279.356 473.524 282.306 478.287 287.525C481.916 291.383 486.452 297.964 488.834 302.842C491.102 307.494 493.483 314.075 494.164 317.365C494.844 320.542 495.411 326.669 495.411 330.981C495.411 335.179 494.617 341.646 493.597 345.39C492.69 349.135 490.195 355.261 488.267 358.892C486.226 362.636 482.256 368.31 479.421 371.373C476.586 374.55 471.483 378.975 468.081 381.131C464.678 383.286 458.781 386.236 454.926 387.598C450.956 389.073 444.039 390.548 439.616 390.888C433.946 391.342 428.616 391.002 422.832 389.754C418.182 388.733 411.265 386.463 407.522 384.648C403.78 382.833 397.883 378.861 394.481 375.684C391.078 372.621 385.975 367.175 383.14 363.658C379.851 359.573 376.449 356.623 373.841 355.602C371.459 354.694 367.604 353.9 365.336 353.9C362.727 353.9 357.964 355.375 353.088 357.758C348.325 360.027 339.933 366.04 332.335 372.508C325.417 378.521 318.046 385.556 316.231 388.279C314.303 390.888 312.148 395.086 311.468 397.583C310.901 400.079 310.674 404.731 311.014 407.794C311.355 410.971 312.942 416.077 314.303 419.14C315.777 422.317 338.799 462.369 365.562 508.207C392.213 554.045 418.749 598.976 424.306 608.053C429.977 617.13 438.142 629.384 442.564 635.284C446.874 641.184 453.792 650.147 457.761 655.139C461.73 660.132 467.173 665.918 469.782 668.074C472.277 670.116 476.699 672.953 479.535 674.201C482.37 675.449 488.38 676.924 492.916 677.378C497.566 677.945 502.442 679.307 504.144 680.555C505.958 681.689 508.226 684.639 509.474 687.022C510.834 689.972 511.401 693.035 511.061 695.985C510.834 698.482 509.7 701.885 508.68 703.701C507.659 705.403 505.051 707.672 503.009 708.693C500.855 709.828 496.659 710.622 492.576 710.622C488.834 710.735 470.235 710.055 451.183 709.147C422.265 707.899 408.543 707.785 367.263 709.033C319.406 710.508 317.819 710.508 313.396 708.353C310.901 707.218 307.726 704.382 306.251 702.226C304.55 699.503 303.756 696.553 303.756 693.149C303.756 690.085 304.664 686.568 306.025 684.412C307.272 682.37 309.313 680.101 310.561 679.534C311.808 678.966 315.21 678.059 318.159 677.718C321.221 677.264 325.077 676.13 326.891 675.109C328.706 674.087 331.087 671.251 332.221 668.755C333.922 664.897 334.036 663.762 332.788 660.812C331.994 658.884 311.808 621.668 287.88 577.986C264.065 534.303 242.177 494.478 239.342 489.486C236.621 484.494 232.992 479.048 231.291 477.232C229.703 475.53 227.435 474.169 226.301 474.169C225.28 474.169 223.239 474.736 221.764 475.417C220.404 476.211 213.372 482.225 206.228 488.919C198.063 496.521 192.052 503.215 190.238 506.619C188.537 509.682 186.382 514.788 185.361 517.851C183.66 522.844 183.547 530.446 183.774 584.793C184.114 642.091 184.227 646.403 186.269 651.168C187.403 654.005 189.671 657.976 191.145 660.018C192.506 661.947 196.475 665.464 199.65 667.62C202.939 669.776 208.723 672.612 212.465 673.86C216.208 675.109 223.352 676.584 228.342 677.151C236.394 678.172 237.755 678.626 240.476 681.689C243.311 684.866 243.652 686.114 243.652 693.149C243.652 700.637 243.425 701.318 239.796 705.062C235.94 709.033 235.827 709.033 226.528 708.92C221.311 708.807 210.311 708.466 202.259 708.012C194.207 707.558 150.773 707.672 105.864 708.239C47.8008 708.92 22.8517 708.92 19.3361 708.012C16.7278 707.332 12.7586 705.062 10.6039 703.134C7.08836 699.73 6.74815 698.822 6.74815 693.149C6.74815 687.476 7.08836 686.568 10.9441 682.824C13.5525 680.101 16.6144 678.399 19.1093 678.059C21.264 677.718 29.7694 676.357 37.8212 674.995C45.873 673.634 54.832 671.364 57.5537 670.116C60.2754 668.755 65.0384 664.784 68.2138 661.38C71.3891 657.976 75.2449 652.303 79.7811 642.659V372.621C79.7811 161.697 79.4409 100.428 78.3068 92.9392C77.513 87.3796 76.0387 82.047 74.9047 80.4585C73.7706 78.87 70.2551 76.3739 67.1931 74.8989C64.1312 73.5374 56.7599 71.2681 50.8628 70.0201C44.9657 68.772 34.1922 67.4105 27.0477 66.9566C17.635 66.3893 12.7586 65.5951 9.58328 64.0066C7.08836 62.7586 4.13983 60.4893 2.89237 58.9009C1.64491 57.3124 0.510858 53.4547 0.170642 49.824C-0.282979 44.3778 0.0572368 43.0163 2.55215 39.499C4.13983 37.3432 7.20177 34.6202 9.12966 33.599C12.5318 31.7836 17.8619 31.6702 64.4714 32.0106V32.0106ZM772.687 250.877C785.842 250.764 801.832 251.331 810.678 252.352C819.07 253.26 829.617 254.735 833.926 255.643C838.235 256.55 848.215 258.933 856.04 260.862C863.865 262.791 874.525 266.194 879.855 268.35C885.185 270.506 893.577 275.044 898.567 278.335C903.557 281.625 910.134 287.185 913.196 290.475C916.258 293.879 921.815 300.687 925.557 305.679C929.186 310.671 933.949 317.819 935.991 321.564C938.032 325.308 941.548 333.363 943.816 339.49C946.084 345.504 948.692 354.24 949.599 358.779C950.62 363.204 952.208 372.848 953.115 379.996C954.136 387.825 955.156 407.681 955.61 429.352C956.063 449.321 956.063 481.203 955.723 500.265C955.383 519.326 955.383 562.215 956.404 656.501L959.806 662.061C962.074 665.805 965.703 669.209 970.579 672.499C974.662 675.222 981.239 678.512 985.322 679.76C989.745 681.122 997.683 682.37 1005.28 682.824C1016.4 683.391 1018.32 683.845 1022.52 686.682C1025.13 688.384 1028.3 691.447 1029.55 693.489C1030.8 695.532 1031.82 699.162 1031.82 701.658C1031.82 704.495 1030.91 707.672 1029.21 710.168C1027.74 712.324 1024.56 715.047 1022.07 716.295C1017.87 718.224 1014.58 718.337 966.61 717.883C918.073 717.43 915.124 717.316 907.299 714.933C902.876 713.572 896.185 710.962 892.556 709.147C889.041 707.332 882.01 702.907 877.02 699.162C872.03 695.418 866.587 690.539 864.999 688.497C863.298 686.341 860.349 681.462 858.422 677.605C856.494 673.634 853.885 669.889 852.638 669.322C851.126 668.566 848.858 668.566 845.834 669.322C842.431 670.23 838.235 673.293 829.05 681.916C822.359 688.157 812.039 696.553 806.142 700.524C800.245 704.495 792.76 708.807 789.698 710.168C786.523 711.643 778.698 714.366 772.12 716.408C765.543 718.451 754.542 720.947 747.738 721.968C740.934 722.989 730.16 724.237 723.923 724.805C717.232 725.372 707.479 725.485 700.108 724.805C693.303 724.237 683.551 722.989 678.561 721.968C673.571 720.947 664.952 718.564 659.282 716.749C653.612 714.82 642.952 710.735 635.467 707.558C627.982 704.382 618.229 699.389 613.92 696.439C609.61 693.489 602.239 687.249 597.703 682.484C591.466 675.903 588.29 671.364 584.548 663.422C581.713 657.636 577.97 647.764 576.156 641.524C574.228 635.284 572.187 626.207 571.506 621.441C570.826 616.563 570.259 603.741 570.259 593.076C570.259 576.284 570.712 571.972 572.98 563.236C574.341 557.563 577.29 549.167 579.331 544.515C581.372 539.863 586.022 531.694 589.651 526.361C593.28 521.028 599.971 512.405 604.507 507.186C609.27 501.626 619.363 492.323 628.095 485.288C638.642 476.892 647.148 471.105 655.313 466.907C661.89 463.503 672.891 458.965 679.695 456.809C686.499 454.54 698.066 451.25 705.211 449.321C712.356 447.392 724.15 444.555 731.294 443.08C738.439 441.605 752.728 439.336 763.048 437.975C773.368 436.727 792.646 435.138 805.801 434.571C825.647 433.55 830.751 432.982 834.153 431.167C836.534 430.032 839.369 428.104 840.39 426.969C841.411 425.721 843.225 422.771 844.359 420.275C846.174 416.304 846.401 412.786 846.287 393.611C846.06 373.529 845.834 370.352 842.998 359.573C841.297 352.992 838.916 345.617 837.668 343.121C836.421 340.625 832.452 334.271 828.936 329.052C825.421 323.833 818.956 316.231 814.647 312.26C810.338 308.175 804.441 303.41 801.605 301.594C798.77 299.666 792.873 297.056 788.564 295.694C782.213 293.652 778.131 293.198 768.151 293.312C759.759 293.425 752.841 294.333 747.171 295.808C742.521 297.056 735.944 299.212 732.542 300.687C729.14 302.162 724.49 305.452 722.222 307.948C719.387 311.125 717.686 314.302 716.778 318.5C715.985 321.677 715.417 327.577 715.417 331.548C715.417 336.427 716.552 341.533 718.82 348.227C720.748 353.56 722.449 359.913 722.902 362.41C723.242 364.906 723.016 370.238 722.335 374.323C721.655 378.408 719.387 385.442 717.119 389.981C713.943 396.448 711.562 399.511 705.438 404.731C701.242 408.248 693.303 413.921 687.633 417.098C680.942 420.956 674.138 423.906 667.787 425.494C659.168 427.763 657.127 427.877 647.941 426.742C641.477 426.061 634.219 424.246 628.095 421.863C621.291 419.254 616.868 416.644 612.899 413.013C609.384 409.723 605.981 404.957 603.6 399.852C601.445 395.54 598.724 387.031 597.363 381.131C595.435 372.735 595.095 368.31 595.548 360.708C595.888 355.035 597.363 347.773 598.95 343.121C600.425 338.81 603.146 332.342 604.847 328.939C606.548 325.535 610.177 319.635 612.786 315.89C615.507 312.146 621.405 305.452 626.054 301.027C630.59 296.489 639.663 289.681 646.24 285.596C652.818 281.512 661.777 276.406 666.086 274.137C670.396 271.981 679.922 267.783 687.066 264.833C694.211 261.883 702.376 258.819 705.211 257.912C708.046 257.004 714.624 255.529 719.954 254.508C725.284 253.487 734.129 252.239 739.8 251.785C745.47 251.331 760.213 250.877 772.687 250.877V250.877ZM773.254 478.821C765.202 480.75 755.676 483.926 751.14 486.309C746.831 488.465 738.892 493.117 733.562 496.748C728.346 500.265 720.861 506.165 717.005 509.909C713.263 513.653 708.273 519.553 706.118 522.957C703.85 526.361 699.654 534.53 696.706 541.111C693.757 547.692 689.901 558.924 688.087 566.072C685.705 575.603 684.798 581.843 684.798 589.332C684.798 595.005 685.252 602.266 685.932 605.557C686.499 608.734 688.314 614.18 689.788 617.47C691.376 620.647 695.798 627.114 699.768 631.539C703.737 636.078 709.974 642.091 713.716 644.814C717.459 647.538 723.583 651.395 727.325 653.211C731.067 655.026 737.758 657.636 742.068 658.997C748.078 660.812 753.181 661.38 763.048 661.38C772.914 661.38 777.904 660.926 783.461 659.224C787.543 657.976 793.1 655.48 795.935 653.664C798.77 651.962 804.554 647.197 808.863 643.113C813.059 639.141 819.297 631.766 822.585 626.774C825.988 621.782 830.977 613.386 833.813 608.053C836.648 602.72 839.936 595.572 841.07 592.168C842.318 588.765 844.132 581.39 845.153 575.717C846.741 567.547 847.081 558.811 847.081 532.034C846.968 504.69 846.627 497.428 845.153 492.323C843.792 487.784 841.864 484.607 838.009 480.863C834.833 477.573 831.091 475.077 828.256 474.282C825.761 473.602 818.616 473.148 812.379 473.148C806.142 473.261 797.976 473.715 794.234 474.282C790.492 474.85 781.079 476.892 773.254 478.821V478.821ZM1955.5 250.877C1957.43 250.764 1965.48 251.218 1973.65 251.785C1981.81 252.352 1993.72 253.941 2000.3 255.302C2006.88 256.664 2015.5 259.273 2019.58 261.089C2023.66 262.904 2030.01 266.648 2033.75 269.258C2037.5 271.981 2043.05 276.86 2046 280.264C2049.06 283.667 2053.03 289 2054.73 292.064C2056.55 295.241 2059.04 301.367 2060.29 305.679C2061.65 309.99 2063.13 319.294 2063.69 326.102C2064.26 333.137 2064.26 342.213 2063.69 346.865C2063.13 351.29 2062.22 356.169 2061.65 357.644C2061.2 359.006 2058.36 363.771 2055.64 368.083C2052.81 372.394 2047.14 379.088 2042.94 382.833C2038.74 386.577 2032.51 391.229 2028.88 393.271C2025.36 395.313 2018.33 398.036 2013.34 399.398C2006.08 401.327 2001.89 401.667 1992.25 401.327C1981.02 400.986 1979.77 400.759 1971.27 396.561C1964.8 393.271 1960.04 389.867 1954.26 384.081C1948.7 378.408 1945.07 373.415 1942.12 367.515C1939.74 362.863 1937.7 357.531 1937.36 355.602C1937.13 353.673 1936.45 346.525 1935.77 339.717C1935.09 332.91 1933.96 325.421 1933.28 323.265C1932.48 321.11 1930.78 317.592 1929.31 315.664C1927.61 313.394 1924.88 311.465 1922.28 310.671C1919.21 309.764 1916.15 309.764 1910.71 310.671C1906.63 311.352 1899.25 313.848 1894.26 316.231C1889.28 318.614 1881.11 323.265 1876.12 326.669C1871.13 329.96 1863.42 336.313 1859 340.738C1854.57 345.163 1847.88 353.333 1844.25 359.006C1840.62 364.679 1836.09 372.848 1834.05 377.16C1832.01 381.471 1828.6 390.775 1826.34 397.583C1824.07 404.39 1821.23 413.921 1819.98 418.573C1818.85 423.225 1817.04 431.621 1816.13 437.294C1815.11 442.967 1814.09 453.859 1813.75 461.688C1813.41 469.517 1812.61 507.299 1811.93 545.649C1811.14 593.984 1811.14 618.832 1812.05 626.547C1812.61 632.561 1813.97 639.936 1814.99 642.999C1816.02 645.949 1818.74 651.395 1821.01 655.026C1824.07 660.018 1827.02 663.082 1832.46 666.712C1836.54 669.435 1843.12 672.726 1847.2 674.087C1851.74 675.449 1859.34 676.697 1867.16 677.151C1878.27 677.718 1880.2 678.172 1884.4 681.009C1887.01 682.71 1890.18 685.774 1891.43 687.816C1892.68 689.745 1893.7 693.376 1893.7 695.759C1893.7 698.368 1892.45 701.999 1890.52 705.176C1888.82 708.126 1885.99 711.303 1884.06 712.21C1881.11 713.685 1873.85 713.799 1826.79 712.891C1797.19 712.324 1759.88 711.87 1744 711.87C1728.13 711.87 1698.87 711.757 1643.07 711.303L1638.88 707.672C1636.61 705.63 1634.11 702.453 1633.43 700.524C1632.64 698.595 1632.3 695.418 1632.75 693.149C1633.21 690.993 1634.34 687.816 1635.47 686.114C1636.49 684.299 1639.56 681.576 1642.17 679.874C1646.36 677.037 1648.29 676.584 1659.4 676.016C1667.23 675.562 1674.83 674.314 1679.36 672.953C1683.44 671.591 1689.11 668.982 1692.06 667.053C1695.13 665.237 1698.87 662.287 1700.46 660.586C1702.16 658.77 1704.54 655.139 1705.9 652.303C1708.28 647.197 1708.28 646.743 1708.62 516.149C1708.73 444.102 1708.51 372.054 1707.94 356.169C1707.03 327.237 1707.03 327.237 1703.63 320.429C1700.91 314.756 1699.09 312.827 1692.97 308.742C1688.89 306.019 1682.31 302.729 1678.23 301.481C1673.81 300.119 1665.87 298.871 1658.27 298.417C1647.15 297.85 1645.23 297.396 1641.03 294.673C1638.42 292.858 1635.25 289.794 1634 287.866C1632.75 285.71 1631.73 282.079 1631.73 279.583C1631.73 276.746 1632.64 273.569 1634.34 271.073C1635.81 268.918 1638.88 266.194 1641.14 265.173C1644.89 263.358 1649.88 263.131 1691.5 263.131C1718.03 263.131 1742.19 263.698 1747.97 264.379C1753.53 265.06 1762.03 267.102 1766.68 268.804C1771.33 270.619 1778.48 274.477 1782.56 277.541C1786.64 280.491 1792.43 285.596 1795.6 288.773C1798.66 292.064 1802.63 297.396 1804.22 300.8C1805.92 304.09 1808.64 311.125 1810.46 316.458C1812.16 321.79 1814.09 326.783 1814.77 327.577C1815.45 328.371 1817.38 329.052 1819.08 328.939C1821.57 328.939 1823.61 327.237 1828.72 320.769C1832.35 316.231 1838.58 309.31 1842.67 305.565C1846.75 301.708 1854.91 294.446 1860.81 289.341C1866.71 284.235 1875.67 277.314 1880.66 274.023C1885.65 270.733 1892.56 266.535 1895.97 264.833C1899.37 263.131 1907.53 259.954 1914.11 257.912C1920.69 255.756 1930.1 253.487 1935.09 252.919C1940.08 252.352 1945.98 251.671 1948.13 251.445C1950.29 251.218 1953.58 250.991 1955.5 250.877V250.877ZM1410.59 261.089C1412.75 260.975 1420.68 261.429 1428.17 261.996C1435.65 262.677 1445.63 264.152 1450.28 265.514C1454.93 266.762 1463.1 270.052 1468.43 272.889C1473.76 275.612 1480.56 280.037 1483.74 282.76C1486.8 285.483 1491.79 291.269 1494.74 295.581C1497.57 299.892 1501.43 307.494 1503.02 312.487C1505.51 319.748 1506.31 324.967 1507.1 338.583C1507.67 348 1508.57 420.955 1509.82 646.062L1514.58 656.047C1519.35 665.691 1519.57 666.032 1526.49 669.209C1530.69 671.251 1537.27 673.066 1542.37 673.747C1547.24 674.428 1553.14 675.789 1555.41 676.811C1557.79 677.718 1560.97 679.647 1562.44 681.009C1563.92 682.37 1565.84 685.207 1566.64 687.249C1567.54 689.178 1568.22 692.695 1568.22 694.851C1568.22 697.007 1567.54 700.184 1566.64 701.999C1565.84 703.701 1563.58 706.424 1561.53 708.239C1559.61 709.941 1556.09 711.87 1553.71 712.551C1550.65 713.458 1531.71 713.572 1421.37 711.87L1416.26 709.033C1413.54 707.445 1409.68 703.928 1407.76 701.318C1404.47 696.553 1404.35 695.645 1403.56 681.462C1403.22 673.18 1402.88 665.464 1402.77 664.216C1402.77 662.968 1401.75 660.699 1400.61 659.111C1398.57 656.501 1398.12 656.387 1395.17 657.636C1393.35 658.43 1386.55 665.237 1379.97 672.839C1373.39 680.328 1364.66 689.405 1360.35 692.922C1356.16 696.439 1347.54 702.566 1341.07 706.537C1334.72 710.395 1325.88 715.047 1321.57 716.862C1317.26 718.678 1308.53 721.287 1302.29 722.535C1296.05 723.783 1286.41 725.372 1280.74 726.166C1274.28 726.96 1262.94 727.187 1250.12 726.847C1233.11 726.393 1227.9 725.826 1218.37 723.33C1212.13 721.741 1203.97 718.905 1200.22 716.976C1196.48 715.16 1188.88 710.962 1183.21 707.672C1177.54 704.382 1169.38 699.276 1165.07 696.326C1160.76 693.376 1153.5 688.043 1149.19 684.299C1144.88 680.555 1139.1 674.541 1136.6 670.911C1134 667.166 1129.91 660.132 1127.42 655.139C1124.92 650.147 1121.29 641.184 1119.37 635.284C1117.44 629.384 1115.17 622.236 1114.38 619.399C1113.24 615.314 1112.9 585.134 1112.9 324.854L1109.5 319.181C1107.23 315.437 1103.6 312.033 1098.73 308.742C1094.64 306.019 1088.07 302.729 1083.98 301.481C1079.56 300.119 1071.62 298.871 1064.03 298.417C1052.91 297.85 1050.98 297.396 1046.79 294.673C1044.18 292.858 1041 289.794 1039.76 287.866C1038.51 285.71 1037.49 282.079 1037.49 279.583C1037.49 276.746 1038.4 273.569 1040.1 271.073C1041.57 268.918 1044.75 266.194 1047.24 264.946C1051.44 263.018 1054.73 262.904 1102.7 263.358C1151.23 263.812 1154.18 263.925 1161.89 266.308C1166.43 267.669 1173.12 270.279 1176.64 272.094C1180.27 273.91 1187.3 278.335 1192.29 282.079C1198.75 286.958 1202.83 291.156 1206.69 296.716C1209.52 301.027 1213.27 308.629 1214.97 313.621C1216.67 318.614 1218.26 326.329 1218.48 330.64C1218.82 334.952 1219.5 392.931 1220.07 459.419C1220.98 555.067 1221.55 581.843 1222.79 587.63C1223.59 591.715 1225.63 598.295 1227.33 602.38C1228.92 606.465 1231.98 612.478 1234.02 615.882C1235.95 619.172 1241.96 626.434 1247.29 631.88C1255.57 640.389 1258.52 642.545 1267.7 646.97C1273.6 649.92 1281.76 653.097 1285.85 654.118C1292.31 655.707 1295.37 655.82 1309.66 654.799C1318.73 654.118 1329.39 652.643 1333.48 651.622C1337.56 650.601 1343.91 648.332 1347.65 646.516C1351.39 644.814 1357.4 640.957 1360.92 638.12C1364.55 635.284 1369.77 630.065 1372.6 626.547C1375.44 622.916 1380.54 615.428 1383.94 609.755C1387.23 604.195 1391.09 596.253 1392.33 592.168C1393.58 588.084 1395.51 580.482 1396.53 575.149C1398.23 566.299 1398.34 554.953 1397.78 443.534C1397.32 346.412 1396.87 320.656 1395.62 317.025C1394.49 313.394 1392.67 311.465 1386.78 307.608C1382.69 304.885 1376.12 301.594 1372.03 300.346C1367.61 298.985 1359.67 297.737 1352.07 297.283C1340.96 296.716 1339.03 296.262 1334.84 293.539C1332.23 291.723 1329.05 288.66 1327.81 286.731C1326.56 284.575 1325.54 281.058 1325.54 278.448C1325.54 275.952 1326.56 272.435 1327.69 270.506C1328.83 268.577 1331.32 266.081 1333.02 264.833C1336.08 262.677 1338.69 262.564 1371.47 261.996C1390.75 261.656 1408.44 261.202 1410.59 261.089V261.089ZM2177.21 263.471C2226.54 263.812 2229.15 263.925 2236.98 266.308C2241.51 267.669 2248.2 270.279 2251.72 272.094C2255.35 273.91 2262.38 278.335 2267.37 282.079C2273.83 286.958 2277.91 291.042 2281.66 296.716C2284.61 301.027 2288.35 308.402 2290.05 313.054C2293.22 321.564 2293.22 321.677 2294.25 362.977C2295.04 391.456 2294.93 422.998 2293.91 463.957C2293.11 499.13 2292.88 548.372 2293.22 584.226C2293.68 621.215 2294.36 646.516 2295.15 648.899C2295.83 651.055 2297.53 654.799 2299.12 657.182C2300.71 659.451 2305.13 663.422 2308.99 665.918C2312.96 668.528 2319.42 671.591 2323.5 672.953C2328.04 674.314 2335.75 675.562 2343.46 676.016C2354.58 676.584 2356.5 677.037 2360.7 679.874C2363.31 681.576 2366.48 684.639 2367.73 686.682C2368.98 688.724 2370 692.355 2370 694.851C2370 697.687 2369.09 700.864 2367.39 703.36C2365.92 705.516 2362.74 708.353 2360.25 709.601C2355.94 711.87 2353.56 711.87 2239.02 711.87C2129.58 711.87 2121.87 711.757 2119.03 709.941C2117.33 708.807 2114.38 705.743 2112.57 703.134C2110.08 699.616 2109.17 697.007 2109.17 693.716C2109.17 691.22 2110.19 687.476 2111.44 685.547C2112.68 683.505 2115.86 680.441 2118.47 678.739C2122.66 675.903 2124.59 675.449 2135.7 674.882C2143.3 674.428 2151.24 673.18 2155.66 671.818C2159.75 670.57 2166.32 667.28 2170.41 664.557C2174.94 661.493 2178.91 657.749 2180.95 654.572C2183.45 650.374 2184.24 647.424 2185.04 638.688C2185.6 632.788 2185.94 607.486 2185.72 582.524C2185.6 557.563 2185.38 517.511 2185.38 493.457C2185.26 469.403 2185.72 426.515 2186.17 398.15C2186.85 366.154 2186.74 342.894 2186.17 336.881C2185.49 331.548 2184.47 324.967 2183.9 322.131C2183.22 319.294 2182.2 316.117 2181.63 315.096C2181.07 313.962 2177.44 311.012 2173.47 308.515C2169.61 305.906 2163.15 302.842 2159.07 301.481C2154.53 300.119 2146.82 298.871 2139.11 298.417C2127.99 297.85 2126.07 297.396 2121.87 294.673C2119.26 292.858 2116.09 289.794 2114.84 287.866C2113.59 285.71 2112.57 282.079 2112.57 279.583C2112.57 276.633 2113.48 273.683 2115.41 270.96C2116.88 268.691 2119.83 266.081 2121.87 264.946C2125.27 263.244 2130.71 263.131 2177.21 263.471V263.471Z" fill={textColor}/>
        <Path fillRule="evenodd" clipRule="evenodd" d="M2231.08 0.0145293C2235.39 -0.0989318 2241.06 0.468374 2243.55 1.14914C2246.05 1.94337 2250.7 4.32605 2253.76 6.59528C2256.93 8.97796 2260.68 12.6087 2262.26 14.651C2263.85 16.8068 2266.46 21.6856 2271 32.2375L2276.55 31.7837C2280.18 31.5567 2284.83 32.2375 2290.05 33.9394C2296.63 36.0952 2299.23 37.7971 2305.13 43.4702C2310.35 48.4625 2312.96 52.0932 2314.66 56.6317C2316.02 60.2624 2317.04 65.7086 2317.04 69.6797C2317.15 73.4239 2316.36 79.3239 2315.22 82.7277C2313.86 87.2662 2311.48 91.1239 2306.38 96.9104C2300.82 103.264 2299.57 105.42 2300.03 107.689C2300.37 109.278 2301.16 113.589 2301.96 117.333C2303.09 123.12 2302.98 125.276 2301.5 131.516C2300.48 135.601 2298.21 140.82 2296.51 143.316C2294.81 145.699 2291.52 149.443 2289.14 151.485C2286.87 153.641 2282.79 156.478 2280.07 157.839C2276.1 159.995 2273.49 160.449 2264.53 160.449C2255.23 160.449 2252.97 160.108 2248.32 157.612C2245.25 156.024 2240.6 152.847 2238.11 150.464C2235.5 148.195 2232.67 146.266 2231.87 146.266C2231.19 146.266 2228.13 148.308 2225.07 150.918C2222.12 153.414 2217.47 156.591 2214.63 157.952C2211.23 159.654 2206.81 160.562 2201.03 160.789C2194.45 161.129 2191.05 160.676 2186.28 158.86C2182.88 157.612 2177.78 154.662 2175.06 152.279C2172.33 149.897 2168.59 145.812 2166.78 143.089C2165.08 140.479 2162.81 135.147 2161.9 131.176C2160.43 124.822 2160.43 123.233 2164.17 104.626L2157.59 97.3642C2153.51 92.8258 2150.11 87.72 2148.63 83.8623C2147.27 80.1181 2146.25 74.8989 2146.25 70.8143C2146.25 67.0701 2147.16 61.1701 2148.29 57.7663C2149.88 53.0009 2152.15 49.7105 2157.82 44.0375C2164.06 37.7971 2166.55 36.0952 2172.67 34.0529C2176.87 32.5779 2182.2 31.6702 2185.15 31.8971C2187.98 32.0106 2190.93 31.7837 2191.61 31.3298C2192.41 30.876 2194.56 27.3587 2196.38 23.3875C2198.3 19.5299 2201.14 14.7645 2202.95 12.8356C2204.65 10.9068 2208.17 7.72989 2210.67 5.91451C2213.16 3.98567 2217.02 1.82991 2219.17 1.2626C2221.33 0.581835 2226.77 0.0145293 2231.08 0.0145293V0.0145293ZM2209.19 60.6028C2207.6 62.4182 2205.34 66.2759 2204.09 69.1124C2202.61 72.4028 2201.82 76.6008 2201.82 81.0258C2201.82 85.9046 2202.61 89.4219 2204.54 93.3931C2206.02 96.4565 2209.19 100.655 2211.46 102.81C2213.84 104.853 2217.7 107.349 2219.96 108.37C2222.57 109.505 2227.34 110.299 2231.65 110.299C2235.95 110.299 2240.72 109.505 2243.21 108.37C2245.59 107.349 2249.34 104.853 2251.72 102.81C2253.99 100.882 2257.05 96.57 2258.52 93.5065C2260.34 89.4219 2261.13 85.7912 2261.13 80.4585C2261.13 74.5585 2260.56 71.8355 2258.07 66.9566C2256.25 63.5528 2253.08 59.3547 2250.92 57.7663C2248.77 56.0644 2244.91 53.7951 2242.42 52.774C2239.92 51.7528 2234.82 50.9586 2231.08 50.9586C2225.86 50.9586 2222.8 51.6394 2218.15 54.0221C2214.75 55.8374 2210.67 58.674 2209.19 60.6028V60.6028Z" fill={flowerColor}/>
        </Svg>
    </View>

    )
}