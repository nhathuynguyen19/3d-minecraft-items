const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 1, 7);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
const axesHelper = new THREE.AxesHelper(50);
scene.rotation.x = 0.2;
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(4, 7, 8)
scene.add(pointLight);

window.addEventListener('resize', () => {
    // Cập nhật kích thước renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
  
    // Cập nhật tỉ lệ khung hình của camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
  

//request
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

//code
//hex to rgb
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

function rgbToHex(rgb) {
    return `#${((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1)}`;
}

// Hàm nội suy tuyến tính
function lerp(a, b, t) {
    return a + (b - a) * t;
}

// Hàm nội suy màu sắc
function interpolateColor(color1, color2, t) {
    return {
        r: Math.round(lerp(color1.r, color2.r, t)),
        g: Math.round(lerp(color1.g, color2.g, t)),
        b: Math.round(lerp(color1.b, color2.b, t)),
    };
}

// Sử dụng Simplex noise để nội suy màu sắc
const simplex = new SimplexNoise();

function perlinNoiseColorInterpolation(x, y, hexColor1, hexColor2) {
    const color1 = hexToRgb(hexColor1);
    const color2 = hexToRgb(hexColor2);
    const noiseValue = Math.abs(simplex.noise2D(x, y)); // Lấy giá trị noise tại điểm (x, y)
    const interpolatedColor = interpolateColor(color1, color2, noiseValue);
    return rgbToHex(interpolatedColor);
}

const hexColor1 = '#916691';
const hexColor2 = '#916291';



//plane up side 1
const upSide = new THREE.PlaneGeometry(0.1, 0.1);
const group1 = new THREE.Group();
for (let i = 0; i < 14; i++) {
    for (let j = 0; j < 14; ++j) {
        const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
        const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(upSide, material1);
        plane.position.y = 1.6;
        plane.position.z = (i - (16 - 1) / 2) * 0.1;
        plane.position.x = (j - (16 - 1) / 2) * 0.1;
        plane.rotation.x = Math.PI / 2;
        group1.add(plane);
    }
}
scene.add(group1);
// Animation setup using GSAP keyframes
gsap.to(group1.position, {
    keyframes: [
        { y: 0, duration: 0.5, ease: "power1.inOut" },
        { y: 0, duration: 0.5, ease: "power1.inOut" },
        { y: 0.3, duration: 0.3, ease: "power1.out" },
        { y: 0.3, duration: 2, ease: "power1.inOut" },
        { y: 0, duration: 0.3, ease: "power1.out" },
        { y: 0, duration: 1, ease: "power1.inOut" },
        { y: 0.4, duration: 0.5, ease: "power1.in" },
        { y: 1.9, duration: 1, ease: "power1.out" },
        { y: 2, duration: 1, ease: "power1.inOut" },
        { y: 0.4, duration: 1, ease: "power1.in" },
        { y: 0, duration: 0.3 }
    ],
    repeat: -1
});
gsap.to(group1.rotation, {
    keyframes: [
        { y: 0, duration: 0.5, ease: "power1.inOut" },
        { y: 0, duration: 0.5, ease: "power1.inOut" },
        { y: 0, duration: 0.3, ease: "power1.inOut" },
        { y: 0, duration: 2, ease: "power1.inOut" },
        { y: 0, duration: 0.3, ease: "power1.inOut" },
        { y: 0, duration: 1, ease: "power1.inOut" },
        { y: 0, duration: 0.5, ease: "power1.inOut" },
        { y: -Math.PI * 2, duration: 1, ease: "power1.inOut" },
        { y: -Math.PI * 2, duration: 1, ease: "power1.inOut" },
        { y: 0, duration: 1, ease: "power1.inOut" },
        { y: 0, duration: 0.3, ease: "power1.inOut" }
    ],
    repeat: -1
});

//plane upside 2
for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i == 0 || i == 15) {
            if (j < 1 || j > 2 && j < 5 || j > 6 && j < 9 || j > 10 && j < 13 || j > 14 && j < 16) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x6F4D6F, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.y = 1.6;
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group1.add(plane);
            }
            else {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.y = 1.6;
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group1.add(plane);
            }
        }
        else {
            if ((i < 1 || i > 2 && i < 5 || i > 6 && i < 9 || i > 10 && i < 13 || i > 14 && i < 16) && (j < 1 || j > 14)) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x6F4D6F, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.y = 1.6;
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group1.add(plane);
            }
            else if ((i > 0 && i < 3 || i > 4 && i < 7 || i > 8 && i < 11 || i > 12 && i < 15) && (j < 1 || j > 14)) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.y = 1.6;
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group1.add(plane);
            }
        }
    }
}

//plane upside 3
for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i == 1 || i == 14) {
            if (j > 0 && j < 3 || j > 4 && j < 7 || j > 8 && j < 11 || j > 12 && j < 15) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x6F4D6F, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.y = 1.6;
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group1.add(plane);
            }
            else if (j > 0 && j < 15) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x815A81, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.y = 1.6;
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group1.add(plane);
            }
        }
        else {
            if ((i > 0 && i < 3 || i > 4 && i < 7 || i > 8 && i < 11 || i > 12 && i < 15) && (j == 1 || j == 14)) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x6F4D6F, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.y = 1.6;
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group1.add(plane);
            }
            else if ((i > 2 && i < 5 || i > 6 && i < 9 || i > 10 && i < 13) && (j == 1 || j == 14)) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x815A81, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.y = 1.6;
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group1.add(plane);
            }
        }
    }
}

//plane upside 4
for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i == 2 || i == 13) {
            if (j > 1 && j < 3 || j > 4 && j < 7 || j > 8 && j < 11 || j > 12 && j < 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x815A81, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.y = 1.6;
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group1.add(plane);
            }
        }
        else if (i > 2 && i < 13) {
            if ((i > 4 && i < 7 || i > 8 && i < 11) && (j == 2 || j == 13)) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x815A81, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.y = 1.6;
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group1.add(plane);
            }
        }
    }
}
scene.add(group1);

//side lid 1 (front)
const group2 = new THREE.Group();
for (let i = 1; i < 13; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i > 4 && i < 13) {
            const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
            const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(upSide, material1);
            plane.position.x = (j - (16 - 1) / 2) * 0.1;
            plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
            plane.position.z = 0.8
            group2.add(plane);
        }
        else {
            if (j >= 0 && j < 4 || j > 11 && j < 16) {
                const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
                const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                plane.position.z = 0.8
                group2.add(plane);
            }
        }
    }
}

for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i > 0 && i < 13) {
            if (i == 1) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group2.add(plane);
                }
                else if (j == 12) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group2.add(plane);
                }
            }
            if (i == 2) {
                if (j < 3 || j > 12) {
                    if (j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group2.add(plane);
                }
                else if (j == 12) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group2.add(plane);
                }
            }
            else if (i == 3) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 13) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group2.add(plane);
                }
                else if (j == 12) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group2.add(plane);
                }
            }
            else if (i == 4) {
                if (j < 3 || j > 12) {
                    if (j == 0 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group2.add(plane);
                }
                else if (j == 12) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group2.add(plane);
                }
            }
            else if (i == 5) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                }
                else if (j > 2 && j < 12) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group2.add(plane);
                }
            }
            else if (i == 6) {
                if (j < 3 || j > 12) {
                    if (j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                }
            }
            else if (i == 7) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 13) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                }
            }
            else if (i == 8) {
                if (j < 3 || j > 12) {
                    if (j == 0 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                }
            }
            else if (i == 9) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group2.add(plane);
                    }
                }
            }
            else if (i == 10) {
                if (j == 2 || j == 6 || j == 10 || j == 14) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group2.add(plane);
                }
                if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group2.add(plane);
                }
            }
            else if (i == 11) {
                if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group2.add(plane);
                }
                if (j == 0 || j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group2.add(plane);
                }
            }
            else if (i == 12) {
                if (j == 0 || j == 4 || j == 8 || j == 12) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group2.add(plane);
                }
                if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group2.add(plane);
                }
            }
        }
    }
}
group1.add(group2);

//side lid 2 (back)
const group3 = new THREE.Group();
for (let i = 1; i < 13; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i > 4 && i < 13) {
            const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
            const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(upSide, material1);
            plane.position.x = (j - (16 - 1) / 2) * 0.1;
            plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
            plane.position.z = 0.8
            group3.add(plane);
        }
        else {
            if (j >= 0 && j < 4 || j > 11 && j < 16) {
                const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
                const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                plane.position.z = 0.8
                group3.add(plane);
            }
        }
    }
}
group3.rotation.y = Math.PI

for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i > 0 && i < 13) {
            if (i == 1) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group3.add(plane);
                }
            }
            if (i == 2) {
                if (j < 3 || j > 12) {
                    if (j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group3.add(plane);
                }
            }
            else if (i == 3) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 13) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group3.add(plane);
                }
            }
            else if (i == 4) {
                if (j < 3 || j > 12) {
                    if (j == 0 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group3.add(plane);
                }
            }
            else if (i == 5) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                }
                else if (j > 2 && j < 12) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group3.add(plane);
                }
            }
            else if (i == 6) {
                if (j < 3 || j > 12) {
                    if (j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                }
            }
            else if (i == 7) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 13) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                }
            }
            else if (i == 8) {
                if (j < 3 || j > 12) {
                    if (j == 0 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                }
            }
            else if (i == 9) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group3.add(plane);
                    }
                }
            }
            else if (i == 10) {
                if (j == 2 || j == 6 || j == 10 || j == 14) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group3.add(plane);
                }
                if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group3.add(plane);
                }
            }
            else if (i == 11) {
                if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group3.add(plane);
                }
                if (j == 0 || j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group3.add(plane);
                }
            }
            else if (i == 12) {
                if (j == 0 || j == 4 || j == 8 || j == 12) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group3.add(plane);
                }
                if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group3.add(plane);
                }
            }
        }
    }
}
group1.add(group3);

//side lid 3 (right)
const group4 = new THREE.Group();
for (let i = 1; i < 13; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i > 4 && i < 13) {
            const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
            const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(upSide, material1);
            plane.position.x = (j - (16 - 1) / 2) * 0.1;
            plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
            plane.position.z = 0.8
            group4.add(plane);
        }
        else {
            if (j >= 0 && j < 4 || j > 11 && j < 16) {
                const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
                const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                plane.position.z = 0.8
                group4.add(plane);
            }
        }
    }
}
group4.rotation.y = Math.PI / 2;
group1.add(group4);

for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i > 0 && i < 13) {
            if (i == 1) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group4.add(plane);
                }
            }
            if (i == 2) {
                if (j < 3 || j > 12) {
                    if (j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group4.add(plane);
                }
            }
            else if (i == 3) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 13) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group4.add(plane);
                }
            }
            else if (i == 4) {
                if (j < 3 || j > 12) {
                    if (j == 0 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group4.add(plane);
                }
            }
            else if (i == 5) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                }
                else if (j > 2 && j < 12) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group4.add(plane);
                }
            }
            else if (i == 6) {
                if (j < 3 || j > 12) {
                    if (j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                }
            }
            else if (i == 7) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 13) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                }
            }
            else if (i == 8) {
                if (j < 3 || j > 12) {
                    if (j == 0 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                }
            }
            else if (i == 9) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group4.add(plane);
                    }
                }
            }
            else if (i == 10) {
                if (j == 2 || j == 6 || j == 10 || j == 14) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group4.add(plane);
                }
                if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group4.add(plane);
                }
            }
            else if (i == 11) {
                if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group4.add(plane);
                }
                if (j == 0 || j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group4.add(plane);
                }
            }
            else if (i == 12) {
                if (j == 0 || j == 4 || j == 8 || j == 12) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group4.add(plane);
                }
                if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group4.add(plane);
                }
            }
        }
    }
}

//side lid 4 (left)
const group5 = new THREE.Group();
for (let i = 1; i < 13; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i > 4 && i < 13) {
            const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
            const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(upSide, material1);
            plane.position.x = (j - (16 - 1) / 2) * 0.1;
            plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
            plane.position.z = 0.8
            group5.add(plane);
        }
        else {
            if (j >= 0 && j < 4 || j > 11 && j < 16) {
                const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
                const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                plane.position.z = 0.8
                group5.add(plane);
            }
        }
    }
}
group5.rotation.y = -Math.PI / 2;
group1.add(group5);

for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i > 0 && i < 13) {
            if (i == 1) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group5.add(plane);
                }
            }
            if (i == 2) {
                if (j < 3 || j > 12) {
                    if (j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group5.add(plane);
                }
            }
            else if (i == 3) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 13) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group5.add(plane);
                }
            }
            else if (i == 4) {
                if (j < 3 || j > 12) {
                    if (j == 0 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                }
                else if (j == 3) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group5.add(plane);
                }
            }
            else if (i == 5) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                }
                else if (j > 2 && j < 12) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group5.add(plane);
                }
            }
            else if (i == 6) {
                if (j < 3 || j > 12) {
                    if (j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                }
            }
            else if (i == 7) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 13) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                }
            }
            else if (i == 8) {
                if (j < 3 || j > 12) {
                    if (j == 0 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                    if (j == 1 || j == 13 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                }
            }
            else if (i == 9) {
                if (j < 3 || j > 12) {
                    if (j == 1 || j == 15) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                    if (j == 0 || j == 2 || j == 14) {
                        const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                        const plane = new THREE.Mesh(upSide, material1);
                        plane.position.x = (j - (16 - 1) / 2) * 0.1;
                        plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                        plane.position.z = 0.8
                        group5.add(plane);
                    }
                }
            }
            else if (i == 10) {
                if (j == 2 || j == 6 || j == 10 || j == 14) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group5.add(plane);
                }
                if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group5.add(plane);
                }
            }
            else if (i == 11) {
                if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group5.add(plane);
                }
                if (j == 0 || j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group5.add(plane);
                }
            }
            else if (i == 12) {
                if (j == 0 || j == 4 || j == 8 || j == 12) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group5.add(plane);
                }
                if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.position.y = ((i - (13 - 1) / 2) * 0.1) + 0.95;
                    plane.position.z = 0.8
                    group5.add(plane);
                }
            }
        }
    }
}

//lid down
const group6 = new THREE.Group();
for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i == 0 || i == 15) {
            if (j < 4 || j > 11) {
                const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
                const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.y = 0.4;
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group6.add(plane);
            }
        }
        else {
            if (i > 0 && i < 4) {
                if (j == 0 || j == 15) {
                    const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
                    const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.y = 0.4;
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group6.add(plane);
                }
            }
            if (i > 11 && i < 16) {
                if (j == 0 || j == 15) {
                    const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
                    const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.y = 0.4;
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group6.add(plane);
                }
            }
        }
    }
}
group1.add(group6);

//body down
const group7 = new THREE.Group();
for (let i = 0; i < 14; i++) {
    for (let j = 0; j < 14; ++j) {
        const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
        const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(upSide, material1);
        plane.position.z = (i - (14 - 1) / 2) * 0.1;
        plane.position.x = (j - (14 - 1) / 2) * 0.1;
        plane.rotation.x = Math.PI / 2;
        group7.add(plane);
    }
}
scene.add(group7);

//body down 2 (vien ngoai)
for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i == 0 || i == 15) {
            const material1 = new THREE.MeshLambertMaterial({ color: 0x664967, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(upSide, material1);
            plane.position.z = (i - (16 - 1) / 2) * 0.1;
            plane.position.x = (j - (16 - 1) / 2) * 0.1;
            plane.rotation.x = Math.PI / 2;
            group7.add(plane);
        }
        else {
            if (j == 0 || j == 15) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x664967, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group7.add(plane);
            }
        }
    }
}

//body down 3 (vien trong)
for (let i = 2; i < 14; i++) {
    for (let j = 2; j < 14; ++j) {
        if (i == 2 || i == 13) {
            if (i == 2) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x664967, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group7.add(plane);
            }
            else {
                if (j == 2 || (j > 3 && j < 14)) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x664967, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group7.add(plane);
                }
            }
        }
        else {
            if (j == 2 || j == 13) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x664967, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group7.add(plane);
            }
            if (i == 12) {
                if (j == 4) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x664967, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group7.add(plane);
                }
            }
        }
    }
}

//body down 4 (vien 3)
for (let i = 4; i < 12; i++) {
    for (let j = 4; j < 12; ++j) {
        if (i == 4 || i == 11) {
            if (i == 4) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x664967, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group7.add(plane);
            }
            else {
                if (j == 4 || (j > 5 && j < 12)) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x664967, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group7.add(plane);
                }
            }
        }
        else {
            if (j == 4 || j == 11) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x664967, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group7.add(plane);
            }
            if (i == 10) {
                if (j == 6) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x664967, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group7.add(plane);
                }
            }
        }
    }
}

//body down 5 (vien giua)
for (let i = 6; i < 10; i++) {
    for (let j = 6; j < 10; ++j) {
        if (i == 6 || i == 9) {
            if (i == 6) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x664967, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group7.add(plane);
            }
            else {
                if (j == 6 || (j > 7 && j < 10)) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x664967, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group7.add(plane);
                }
            }
        }
        else {
            if (j == 6 || j == 9) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x664967, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group7.add(plane);
            }
        }
    }
}


//body side 1
const group8 = new THREE.Group();
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i > 3 && i < 8) {
            const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
            const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(upSide, material1);
            plane.position.z = (i - (16 - 1) / 2) * 0.1;
            plane.position.x = (j - (16 - 1) / 2) * 0.1;
            plane.rotation.x = Math.PI / 2;
            group8.add(plane);
        }
        else {
            if (j > 3 && j < 12) {
                const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
                const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group8.add(plane);
            }
        }
    }
}
//hoa van group8 
for (let i = 4; i < 8; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i == 4) {
            if (j == 0 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x684968, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group8.add(plane);
            }
            else if (j == 1 || j == 13 || j == 15) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x765276, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group8.add(plane);
            }
            else if (j > 1 && j < 5) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group8.add(plane);
            }
        }
        else if (i == 5) {
            if (j == 1 || j == 5 || j == 9 || j == 13) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x684968, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group8.add(plane);
            }
            else if (j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x765276, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group8.add(plane);
            }
        }
        else if (i == 6) {
            if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group8.add(plane);
            }
            if (j == 0 || j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group8.add(plane);
            }
        }
        else if (i == 7) {
            if (j == 3 || j == 7 || j == 11 || j == 15) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group8.add(plane);
            }
            if (j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group8.add(plane);
            }
        }
    }
}
//chi tiet side 1
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 16; ++j) {
        if (j > 3 && j < 12) {
            if (i == 0) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group8.add(plane);
            }
            else if (i > 0 && i < 4) {
                if (j == 11) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group8.add(plane);
                }
                if (j == 4) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group8.add(plane);
                }
            }
            else {
                if (j == 4) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group8.add(plane);
                }
            }
        }
    }
}
group8.rotation.x = Math.PI / 2;
group8.position.z = 0.8;
group7.add(group8);

//body side 2 (back)
const group9 = new THREE.Group();
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i > 3 && i < 8) {
            const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
            const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(upSide, material1);
            plane.position.z = (i - (16 - 1) / 2) * 0.1;
            plane.position.x = (j - (16 - 1) / 2) * 0.1;
            plane.rotation.x = Math.PI / 2;
            group9.add(plane);
        }
        else {
            if (j > 3 && j < 12) {
                const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
                const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group9.add(plane);
            }
        }
    }
}

//hoa van group9
for (let i = 4; i < 8; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i == 4) {
            if (j == 0 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x684968, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group9.add(plane);
            }
            else if (j == 1 || j == 13 || j == 15) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x765276, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group9.add(plane);
            }
            else if (j > 1 && j < 5) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group9.add(plane);
            }
        }
        else if (i == 5) {
            if (j == 1 || j == 5 || j == 9 || j == 13) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x684968, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group9.add(plane);
            }
            else if (j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x765276, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group9.add(plane);
            }
        }
        else if (i == 6) {
            if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group9.add(plane);
            }
            if (j == 0 || j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group9.add(plane);
            }
        }
        else if (i == 7) {
            if (j == 3 || j == 7 || j == 11 || j == 15) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group9.add(plane);
            }
            if (j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group9.add(plane);
            }
        }
    }
}
//chi tiet side 2 back
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 16; ++j) {
        if (j > 3 && j < 12) {
            if (i == 0) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group9.add(plane);
            }
            else if (i > 0 && i < 4) {
                if (j == 11) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group9.add(plane);
                }
                if (j == 4) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group9.add(plane);
                }
            }
            else {
                if (j == 4) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group9.add(plane);
                }
            }
        }
    }
}
group9.rotation.x = Math.PI / 2;
group9.rotation.z = Math.PI;
group9.position.z = -0.8;
group7.add(group9);

//body side 3 (right)
const group10 = new THREE.Group();
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i > 3 && i < 8) {
            const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
            const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(upSide, material1);
            plane.position.z = (i - (16 - 1) / 2) * 0.1;
            plane.position.x = (j - (16 - 1) / 2) * 0.1;
            plane.rotation.x = Math.PI / 2;
            group10.add(plane);
        }
        else {
            if (j > 3 && j < 12) {
                const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
                const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group10.add(plane);
            }
        }
    }
}

//hoa van group9
for (let i = 4; i < 8; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i == 4) {
            if (j == 0 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x684968, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group10.add(plane);
            }
            else if (j == 1 || j == 13 || j == 15) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x765276, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group10.add(plane);
            }
            else if (j > 1 && j < 5) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group10.add(plane);
            }
        }
        else if (i == 5) {
            if (j == 1 || j == 5 || j == 9 || j == 13) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x684968, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group10.add(plane);
            }
            else if (j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x765276, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group10.add(plane);
            }
        }
        else if (i == 6) {
            if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group10.add(plane);
            }
            if (j == 0 || j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group10.add(plane);
            }
        }
        else if (i == 7) {
            if (j == 3 || j == 7 || j == 11 || j == 15) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group10.add(plane);
            }
            if (j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group10.add(plane);
            }
        }
    }
}
//chi tiet side 2 back
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 16; ++j) {
        if (j > 3 && j < 12) {
            if (i == 0) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group10.add(plane);
            }
            else if (i > 0 && i < 4) {
                if (j == 11) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group10.add(plane);
                }
                if (j == 4) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group10.add(plane);
                }
            }
            else {
                if (j == 4) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group10.add(plane);
                }
            }
        }
    }
}
group10.rotation.x = Math.PI / 2;
group10.rotation.z = -Math.PI / 2;
group10.position.x = 0.8;
group7.add(group10);

//body side 4 (left)
const group11 = new THREE.Group();
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i > 3 && i < 8) {
            const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
            const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(upSide, material1);
            plane.position.z = (i - (16 - 1) / 2) * 0.1;
            plane.position.x = (j - (16 - 1) / 2) * 0.1;
            plane.rotation.x = Math.PI / 2;
            group11.add(plane);
        }
        else {
            if (j > 3 && j < 12) {
                const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
                const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group11.add(plane);
            }
        }
    }
}

//hoa van group9
for (let i = 4; i < 8; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i == 4) {
            if (j == 0 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x684968, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group11.add(plane);
            }
            else if (j == 1 || j == 13 || j == 15) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x765276, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group11.add(plane);
            }
            else if (j > 1 && j < 5) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group11.add(plane);
            }
        }
        else if (i == 5) {
            if (j == 1 || j == 5 || j == 9 || j == 13) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x684968, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group11.add(plane);
            }
            else if (j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x765276, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group11.add(plane);
            }
        }
        else if (i == 6) {
            if (j == 1 || j == 3 || j == 5 || j == 7 || j == 9 || j == 11 || j == 13 || j == 15) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group11.add(plane);
            }
            if (j == 0 || j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group11.add(plane);
            }
        }
        else if (i == 7) {
            if (j == 3 || j == 7 || j == 11 || j == 15) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x6B4B6B, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group11.add(plane);
            }
            if (j == 2 || j == 4 || j == 6 || j == 8 || j == 10 || j == 12 || j == 14) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x7A547A, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group11.add(plane);
            }
        }
    }
}
//chi tiet side 2 back
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 16; ++j) {
        if (j > 3 && j < 12) {
            if (i == 0) {
                const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group11.add(plane);
            }
            else if (i > 0 && i < 4) {
                if (j == 11) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x8A6086, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group11.add(plane);
                }
                if (j == 4) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group11.add(plane);
                }
            }
            else {
                if (j == 4) {
                    const material1 = new THREE.MeshLambertMaterial({ color: 0x9C6F98, side: THREE.DoubleSide });
                    const plane = new THREE.Mesh(upSide, material1);
                    plane.position.z = (i - (16 - 1) / 2) * 0.1;
                    plane.position.x = (j - (16 - 1) / 2) * 0.1;
                    plane.rotation.x = Math.PI / 2;
                    group11.add(plane);
                }
            }
        }
    }
}
group11.rotation.x = Math.PI / 2;
group11.rotation.z = Math.PI / 2;
group11.position.x = -0.8;
group7.add(group11);

//up of body
const group12 = new THREE.Group();
for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; ++j) {
        if (i == 0 || i == 15) {
            if (j > 3 && j < 12) {
                const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
                const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group12.add(plane);
            }
        }
        else if (i > 3 && i < 12) {
            if (j == 0 || j == 15) {
                const resultHexColor = perlinNoiseColorInterpolation(i / 4, j / 4, hexColor1, hexColor2);
                const material1 = new THREE.MeshLambertMaterial({ color: resultHexColor, side: THREE.DoubleSide });
                const plane = new THREE.Mesh(upSide, material1);
                plane.position.z = (i - (16 - 1) / 2) * 0.1;
                plane.position.x = (j - (16 - 1) / 2) * 0.1;
                plane.rotation.x = Math.PI / 2;
                group12.add(plane);
            }
        }
    }
}
group12.position.y = 0.8;
group7.add(group12);

// Hàm tính toán và in ra góc zOx
function calculateAndPrintAngle() {
    // Tính toán góc zOx
    var angleZox = Math.atan2(cube1.position.z, cube1.position.x);
    var angleZoy = Math.atan2(cube1.position.z, cube1.position.y);

    // Gọi hàm animation của shulker với góc zOx đã tính được
    animateShulkerRotation(angleZox, angleZoy);
}

// Xử lý sự kiện di chuyển chuột
document.addEventListener('mousemove', function (event) {
    // Tính toán vị trí chuột trong không gian 3D
    var mouseVector = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
    );
    mouseVector.unproject(camera);

    // Tìm hướng và khoảng cách từ camera đến vị trí chuột
    var direction = mouseVector.sub(camera.position).normalize();
    var distance = -camera.position.z / direction.z;

    // Cập nhật vị trí của vật thể 3D
    cube1.position.copy(camera.position).add(direction.multiplyScalar(distance));

    cube1.position.z = 2;

    // Gọi hàm tính toán góc zOx
    calculateAndPrintAngle();
});

// Tạo một hộp đơn giản làm vật thể 3D
var geometry1 = new THREE.BoxGeometry(0.1, 0.1, 0.1);
var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
var cube1 = new THREE.Mesh(geometry1, material);

scene.add(cube1);

//shulker
const box = new THREE.BoxGeometry(0.6, 0.6, 0.6, 6, 6, 6);
const maudashulker = new THREE.MeshLambertMaterial({ color: 0xDDE7A6 });
const shulker = new THREE.Mesh(box, maudashulker);
shulker.position.y = 0.9;
scene.add(shulker);

//shulker eyes
for (let i = 0; i < 6; ++i) {
    for (let j = 0; j < 6; ++j) {
        if (j == 2) {
            if (i == 1 || i == 4) {
                const coloreye1 = new THREE.MeshLambertMaterial({ color: 0x000000 });
                const eye = new THREE.Mesh(upSide, coloreye1);
                eye.position.x = (i - (6 - 1) / 2) * 0.1;
                eye.position.y = (j - (6 - 1) / 2) * 0.1;
                eye.position.z = 0.301;
                shulker.add(eye);
            }
            if (i == 0 || i == 5) {
                const coloreye1 = new THREE.MeshLambertMaterial({ color: 0xffffff });
                const eye = new THREE.Mesh(upSide, coloreye1);
                eye.position.x = (i - (6 - 1) / 2) * 0.1;
                eye.position.y = (j - (6 - 1) / 2) * 0.1;
                eye.position.z = 0.301;
                shulker.add(eye);
            }
        }
        if (j == 1) {
            if (i < 2 || i > 3) {
                const coloreye1 = new THREE.MeshLambertMaterial({ color: 0xAEAB7B });
                const eye = new THREE.Mesh(upSide, coloreye1);
                eye.position.x = (i - (6 - 1) / 2) * 0.1;
                eye.position.y = (j - (6 - 1) / 2) * 0.1;
                eye.position.z = 0.301;
                shulker.add(eye);
            }
        }
    }
}
//shulker head front
for (let i = 0; i < 6; ++i) {
    for (let j = 0; j < 6; ++j) {
        if (j == 3) {
            const coloreye1 = new THREE.MeshLambertMaterial({ color: 0xA39F69 });
            const eye = new THREE.Mesh(upSide, coloreye1);
            eye.position.x = (i - (6 - 1) / 2) * 0.1;
            eye.position.y = (j - (6 - 1) / 2) * 0.1;
            eye.position.z = 0.301;
            shulker.add(eye);
        }
    }
}
//shulker head back
for (let i = 0; i < 6; ++i) {
    for (let j = 0; j < 6; ++j) {
        if (j == 3) {
            const coloreye1 = new THREE.MeshLambertMaterial({ color: 0xA39F69 });
            const eye = new THREE.Mesh(upSide, coloreye1);
            eye.position.x = (i - (6 - 1) / 2) * 0.1;
            eye.position.y = (j - (6 - 1) / 2) * 0.1;
            eye.rotation.y = Math.PI;
            eye.position.z = -0.301;
            shulker.add(eye);
        }
    }
}
//shulker head right
for (let i = 0; i < 6; ++i) {
    for (let j = 0; j < 6; ++j) {
        if (j == 3) {
            const coloreye1 = new THREE.MeshLambertMaterial({ color: 0xA39F69 });
            const eye = new THREE.Mesh(upSide, coloreye1);
            eye.position.x = 0.301;
            eye.position.y = (j - (6 - 1) / 2) * 0.1;
            eye.position.z = (i - (6 - 1) / 2) * 0.1;
            eye.rotation.y = Math.PI / 2;
            shulker.add(eye);
        }
    }
}
//shulker head left
for (let i = 0; i < 6; ++i) {
    for (let j = 0; j < 6; ++j) {
        if (j == 3) {
            const coloreye1 = new THREE.MeshLambertMaterial({ color: 0xA39F69 });
            const eye = new THREE.Mesh(upSide, coloreye1);
            eye.position.x = -0.301;
            eye.position.y = (j - (6 - 1) / 2) * 0.1;
            eye.position.z = (i - (6 - 1) / 2) * 0.1;
            eye.rotation.y = -Math.PI / 2;
            shulker.add(eye);
        }
    }
}

// Hàm animation của shulker
function animateShulkerRotation(angleZox, angleZoy) {
    gsap.to(shulker.rotation, {
        x: angleZoy + 0.3 - Math.PI / 2,
        y: -angleZox + Math.PI / 2,
        duration: 1
    });
}

// animation shulker pos
gsap.to(shulker.position, {
    keyframes: [
        { y: 1, duration: 1, ease: "power1.inOut" },
        { y: 0.8, duration: 1, ease: "power1.inOut" }
    ],
    repeat: -1,
    yoyo: true
});


//bullet 
const box1 = new THREE.BoxGeometry(0.2, 0.8, 0.8);
const material1 = new THREE.MeshLambertMaterial({ color: 0xE4D3A1 });
const box2 = new THREE.BoxGeometry(0.4, 1, 1);
const material2 = new THREE.MeshLambertMaterial({ color: 0xE4D3A1, opacity: 0.1, transparent: true});

const group13 = new THREE.Group();
group13.position.y = 0.9;
scene.add(group13);
for (let i = 0; i < 3; ++i) {
    if (i == 0) {
        const bullet1 = new THREE.Mesh(box1, material1);
        const bullet2 = new THREE.Mesh(box2, material2);
        group13.add(bullet1);
        group13.add(bullet2);
    }
    if (i == 1) {
        const bullet1 = new THREE.Mesh(box1, material1)
        bullet1.rotation.y = Math.PI / 2;
        const bullet2 = new THREE.Mesh(box2, material2)
        bullet2.rotation.y = Math.PI / 2;
        group13.add(bullet2);
        group13.add(bullet1);
    }
    if (i == 2) {
        const bullet1 = new THREE.Mesh(box1, material1)
        bullet1.rotation.z = Math.PI / 2;
        const bullet2 = new THREE.Mesh(box2, material2)
        bullet2.rotation.z = Math.PI / 2;
        group13.add(bullet2);
        group13.add(bullet1);
    }
}

//detail group13(bullet)
const material3 = new THREE.MeshLambertMaterial({color: 0xE4CE91});
const box3 = new THREE.BoxGeometry(0.201, 0.1, 0.1);
for (let i = 0; i < 3; ++i) {
    if(i == 0) {
        //detail1
        const group14_1 = new THREE.Group();
        const detail1 = new THREE.Mesh(box3, material3);
        detail1.position.y = 0.3501;
        detail1.position.z = 0.3501;
        group14_1.add(detail1);
        //detail2
        const detail2 = new THREE.Mesh(box3, material3);
        detail2.position.y = -0.3501;
        detail2.position.z = 0.3501;
        group14_1.add(detail2);
        //detail3
        const detail3 = new THREE.Mesh(box3, material3);
        detail3.position.y = 0.3501;
        detail3.position.z = -0.3501;
        group14_1.add(detail3);
        //detail4
        const detail4 = new THREE.Mesh(box3, material3);
        detail4.position.y = -0.3501;
        detail4.position.z = -0.3501;
        group14_1.add(detail4);
        group13.add(group14_1);
    }
    if(i == 1) {
        //detail1
        const group14_2 = new THREE.Group();
        const detail1 = new THREE.Mesh(box3, material3);
        detail1.position.y = 0.3501;
        detail1.position.z = 0.3501;
        group14_2.add(detail1);
        //detail2
        const detail2 = new THREE.Mesh(box3, material3);
        detail2.position.y = -0.3501;
        detail2.position.z = 0.3501;
        group14_2.add(detail2);
        //detail3
        const detail3 = new THREE.Mesh(box3, material3);
        detail3.position.y = 0.3501;
        detail3.position.z = -0.3501;
        group14_2.add(detail3);
        //detail4
        const detail4 = new THREE.Mesh(box3, material3);
        detail4.position.y = -0.3501;
        detail4.position.z = -0.3501;
        group14_2.add(detail4);
        group14_2.rotation.y = Math.PI / 2;
        group13.add(group14_2);
    }
    if(i == 2) {
        //detail1
        const group14_3 = new THREE.Group();
        const detail1 = new THREE.Mesh(box3, material3);
        detail1.position.y = 0.3501;
        detail1.position.z = 0.3501;
        group14_3.add(detail1);
        //detail2
        const detail2 = new THREE.Mesh(box3, material3);
        detail2.position.y = -0.3501;
        detail2.position.z = 0.3501;
        group14_3.add(detail2);
        //detail3
        const detail3 = new THREE.Mesh(box3, material3);
        detail3.position.y = 0.3501;
        detail3.position.z = -0.3501;
        group14_3.add(detail3);
        //detail4
        const detail4 = new THREE.Mesh(box3, material3);
        detail4.position.y = -0.3501;
        detail4.position.z = -0.3501;
        group14_3.add(detail4);
        group14_3.rotation.y = Math.PI / 2;
        group14_3.rotation.x = Math.PI / 2;
        group13.add(group14_3);
    }
}

//detail group13(bullet) 2
const material4 = new THREE.MeshLambertMaterial({color: 0x897378});
const box4 = new THREE.BoxGeometry(0.201, 0.1, 0.1);
for (let i = 0; i < 3; ++i) {
    if(i == 0) {
        //detail1
        const group14_1 = new THREE.Group();
        const detail1 = new THREE.Mesh(box3, material4);
        detail1.position.y = 0.1501;
        detail1.position.z = 0.1501;
        group14_1.add(detail1);
        //detail2
        const detail2 = new THREE.Mesh(box3, material4);
        detail2.position.y = -0.1501;
        detail2.position.z = 0.1501;
        group14_1.add(detail2);
        //detail3
        const detail3 = new THREE.Mesh(box3, material4);
        detail3.position.y = 0.1501;
        detail3.position.z = -0.1501;
        group14_1.add(detail3);
        //detail4
        const detail4 = new THREE.Mesh(box3, material4);
        detail4.position.y = -0.1501;
        detail4.position.z = -0.1501;
        group14_1.add(detail4);
        group13.add(group14_1);
    }
    if(i == 1) {
        //detail1
        const group14_2 = new THREE.Group();
        const detail1 = new THREE.Mesh(box3, material4);
        detail1.position.y = 0.1501;
        detail1.position.z = 0.1501;
        group14_2.add(detail1);
        //detail2
        const detail2 = new THREE.Mesh(box3, material4);
        detail2.position.y = -0.1501;
        detail2.position.z = 0.1501;
        group14_2.add(detail2);
        //detail3
        const detail3 = new THREE.Mesh(box3, material4);
        detail3.position.y = 0.1501;
        detail3.position.z = -0.1501;
        group14_2.add(detail3);
        //detail4
        const detail4 = new THREE.Mesh(box3, material4);
        detail4.position.y = -0.1501;
        detail4.position.z = -0.1501;
        group14_2.add(detail4);
        group14_2.rotation.y = Math.PI / 2;
        group13.add(group14_2);
    }
    if(i == 2) {
        //detail1
        const group14_3 = new THREE.Group();
        const detail1 = new THREE.Mesh(box3, material4);
        detail1.position.y = 0.1501;
        detail1.position.z = 0.1501;
        group14_3.add(detail1);
        //detail2
        const detail2 = new THREE.Mesh(box3, material4);
        detail2.position.y = -0.1501;
        detail2.position.z = 0.1501;
        group14_3.add(detail2);
        //detail3
        const detail3 = new THREE.Mesh(box3, material4);
        detail3.position.y = 0.1501;
        detail3.position.z = -0.1501;
        group14_3.add(detail3);
        //detail4
        const detail4 = new THREE.Mesh(box3, material4);
        detail4.position.y = -0.1501;
        detail4.position.z = -0.1501;
        group14_3.add(detail4);
        group14_3.rotation.y = Math.PI / 2;
        group14_3.rotation.x = Math.PI / 2;
        group13.add(group14_3);
    }
}

//detail group13 3
for (let i = 0; i < 3; ++i) {
    if(i == 0) {
        //detail1
        const group14_1 = new THREE.Group();
        const detail1 = new THREE.Mesh(box3, material4);
        detail1.position.y = 0.2501;
        detail1.position.z = 0.2501;
        group14_1.add(detail1);
        //detail2
        const detail2 = new THREE.Mesh(box3, material4);
        detail2.position.y = -0.2501;
        detail2.position.z = 0.2501;
        group14_1.add(detail2);
        //detail3
        const detail3 = new THREE.Mesh(box3, material4);
        detail3.position.y = 0.2501;
        detail3.position.z = -0.2501;
        group14_1.add(detail3);
        //detail4
        const detail4 = new THREE.Mesh(box3, material4);
        detail4.position.y = -0.2501;
        detail4.position.z = -0.2501;
        group14_1.add(detail4);
        group13.add(group14_1);
    }
    if(i == 1) {
        //detail1
        const group14_2 = new THREE.Group();
        const detail1 = new THREE.Mesh(box3, material4);
        detail1.position.y = 0.2501;
        detail1.position.z = 0.2501;
        group14_2.add(detail1);
        //detail2
        const detail2 = new THREE.Mesh(box3, material4);
        detail2.position.y = -0.2501;
        detail2.position.z = 0.2501;
        group14_2.add(detail2);
        //detail3
        const detail3 = new THREE.Mesh(box3, material4);
        detail3.position.y = 0.2501;
        detail3.position.z = -0.2501;
        group14_2.add(detail3);
        //detail4
        const detail4 = new THREE.Mesh(box3, material4);
        detail4.position.y = -0.2501;
        detail4.position.z = -0.2501;
        group14_2.add(detail4);
        group14_2.rotation.y = Math.PI / 2;
        group13.add(group14_2);
    }
    if(i == 2) {
        //detail1
        const group14_3 = new THREE.Group();
        const detail1 = new THREE.Mesh(box3, material4);
        detail1.position.y = 0.2501;
        detail1.position.z = 0.2501;
        group14_3.add(detail1);
        //detail2
        const detail2 = new THREE.Mesh(box3, material4);
        detail2.position.y = -0.2501;
        detail2.position.z = 0.2501;
        group14_3.add(detail2);
        //detail3
        const detail3 = new THREE.Mesh(box3, material4);
        detail3.position.y = 0.2501;
        detail3.position.z = -0.2501;
        group14_3.add(detail3);
        //detail4
        const detail4 = new THREE.Mesh(box3, material4);
        detail4.position.y = -0.2501;
        detail4.position.z = -0.2501;
        group14_3.add(detail4);
        group14_3.rotation.y = Math.PI / 2;
        group14_3.rotation.x = Math.PI / 2;
        group13.add(group14_3);
    }
}

//animation của bullet
//rotation
gsap.to(group13.rotation, {
    x: Math.PI * 1,
    y: Math.PI * 1,
    z: Math.PI * 1,
    ease: "power.inOut",
    duration: 1, 
    repeat: -1,
    yoyo: true
});

//pos bullet
    gsap.to(group13.position, {
        keyframes: [
            {z: 0, duration: 5.1},
            {z: 10, duration: 3.3}
        ],
        repeat: -1
    });



//xuat hien
gsap.to(group13.scale, {
    keyframes: [
        { x: 0, y: 0, z: 0, duration: 0.1 },
        { x: 0, y: 0, z: 0, duration: 5 },  // Thu nhỏ về 0 trên tất cả các trục
        { x: 1, y: 1, z: 1, duration: 0.1 },  // Phóng to về 1 trên tất cả các trục
        { x: 1, y: 1, z: 1, duration: 3.2 }   // Giữ nguyên kích thước trong 3.2 giây
    ],
    repeat: -1  // Lặp lại vô hạn
});