import * as THREE from "three";
        import {
            OrbitControls,
            EffectComposer,
            ShaderPass,
            RenderPass,
            UnrealBloomPass,
            DotScreenShader,
            SobelOperatorShader,
            LuminosityShader,
            ColorifyShader
        } from "three/addons/Addons.js";

        const scene = new THREE.Scene();

        const group1 = new THREE.Group();
        scene.add(group1);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1.0, 1000);
        camera.position.z = 5;
        scene.add(camera);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
        directionalLight.position.set(2, 2, 3);
        camera.add(directionalLight);

        const textureLoader = new THREE.TextureLoader();
        const texture1 = textureLoader.load('img/command_block_side.png');
        texture1.minFilter = THREE.NearestFilter;
        texture1.magFilter = THREE.NearestFilter;

        const texture2 = textureLoader.load('img/command_block_back.png');
        texture2.minFilter = THREE.NearestFilter;
        texture2.magFilter = THREE.NearestFilter;

        const texture3 = textureLoader.load('img/command_block_front.png');
        texture3.minFilter = THREE.NearestFilter;
        texture3.magFilter = THREE.NearestFilter;

        const textureRight = texture1.clone();
        textureRight.center.set(0.5, 0.5);
        textureRight.rotation = Math.PI / 2;

        const textureLeft = texture1.clone();
        textureLeft.center.set(0.5, 0.5);
        textureLeft.rotation = -Math.PI / 2;

        const textureTop = texture1.clone();
        textureTop.center.set(0.5, 0.5);
        textureTop.rotation = Math.PI;

        const materials = [
            new THREE.MeshPhysicalMaterial({ map: textureRight, emissive: new THREE.Color(0xffffff), emissiveMap: textureRight, emissiveIntensity: 0.2 }),
            new THREE.MeshPhysicalMaterial({ map: textureLeft, emissive: new THREE.Color(0xffffff), emissiveMap: textureLeft, emissiveIntensity: 0.2 }), 
            new THREE.MeshPhysicalMaterial({ map: textureTop, emissive: new THREE.Color(0xffffff), emissiveMap: textureTop, emissiveIntensity: 0.2 }),
            new THREE.MeshPhysicalMaterial({ map: texture1, emissive: new THREE.Color(0xffffff), emissiveMap: texture1, emissiveIntensity: 0.2 }), 
            new THREE.MeshPhysicalMaterial({ map: texture3, emissive: new THREE.Color(0xffffff), emissiveMap: texture3, emissiveIntensity: 0.2 }), 
            new THREE.MeshPhysicalMaterial({ map: texture2, emissive: new THREE.Color(0xffffff), emissiveMap: texture2, emissiveIntensity: 0.2 })  
        ];

        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMesh = new THREE.Mesh(boxGeometry, materials);
        group1.add(cubeMesh);


        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);

        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.7, 0.1);

        composer.addPass(renderPass);
        composer.addPass(bloomPass);


        const orbit = new OrbitControls(camera, renderer.domElement);
        
        group1.rotation.x = Math.PI / 6;

        function animate() {
            composer.render();
            orbit.update();
            group1.rotation.y += 0.01;
            requestAnimationFrame(animate);
        }

        animate();