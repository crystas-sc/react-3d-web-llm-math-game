import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import fontData from 'three/examples/fonts/helvetiker_bold.typeface.json';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { useTexture } from "@react-three/drei"

interface BoxProps {
    position: [number, number, number];
    text: string;
    font: any;
    speed: number;
}

const getTextWidth = (text: string, font) =>{
    const textGeometry = new TextGeometry(text, {
        font,
        size: 1,
        depth : 0.01,
        curveSegments: 12,
    });
    textGeometry.computeBoundingBox();
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
    return textWidth;
}


  function sumBelowIndex(arr: number[]) {
    const result:number[] = [];
    let sum = 0.0;
  
    for (let i = 0; i < arr.length; i++) {
      result.push(sum);
      let next = 1;
      if(i<arr.length-1){
        next = arr[i+1];
      }
      sum = sum+arr[i]+((next+4)/2);
    }
    result[0]=0;
    return result;
  }

const Box: React.FC<BoxProps> = ({ position, text, font, speed }) => {
    const meshRef = useRef<any>(null);
    // const props = useTexture({
    //     map: 'PavingStones092_1K_Color.jpg',
    //     // displacementMap: 'PavingStones092_1K_Displacement.jpg',
    //     normalMap: 'PavingStones092_1K_Normal.jpg',
    //     roughnessMap: 'PavingStones092_1K_Roughness.jpg',
    //     aoMap: 'PavingStones092_1K_AmbientOcclusion.jpg',
    //   })
      const props = useTexture({
        map: 'textures/hangar_concrete_floor_diff_1k.jpg',
        // displacementMap: 'textures/wood_floor_disp_1k.jpg',
        normalMap: 'textures/hangar_concrete_floor_nor_dx_1k.jpg',
        roughnessMap: 'textures/hangar_concrete_floor_rough_1k.jpg',
        aoMap: 'textures/hangar_concrete_floor_ao_1k.jpg',
      })
    useFrame(() => {
        const rotationSpeed= speed*0.0005
        meshRef.current.rotation.x += rotationSpeed;
        meshRef.current.rotation.y += rotationSpeed;
        meshRef.current.rotation.y += rotationSpeed;
    });
    const textGeometry = new TextGeometry(text, {
        font,
        size: 1,
        depth : 0.01,
        curveSegments: 12,
    });
    textGeometry.computeBoundingBox();
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
    const boxWidth = textWidth + 1; // Add 1 unit of padding
    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[boxWidth, 2, 0.5]} />
            <meshPhongMaterial color={"white"} />
            <meshPhongMaterial color={"white"} {...props}  />
            <mesh position={[-textWidth / 2, -0.4, 0.25]}>
                <primitive object={textGeometry} />
                <meshPhongMaterial color={'white'} />
            </mesh>
        </mesh>
     

    );
};

const SpinningBoxes = ({textArray,speed}:{textArray:string[],speed:number}) => {
    const font = new FontLoader().parse(fontData);
    const xOffsets = sumBelowIndex(textArray.map(text => getTextWidth(text, font)))
    return (
        <div style={{ background: "white" }}>
            <Canvas style={{width: xOffsets[xOffsets.length-1]*40, height: 100}} camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={10} />
                <pointLight position={[0, 0, 5]} intensity={0.5} />
                <group position={[-3, 0, 0]}>
                    {textArray.map((text, index) => {

                        return (
                            <Box key={index}
                            speed={speed}
                                position={[xOffsets[index], 0, 0]} text={text} font={font} />
                        )
                    })}
                </group>
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default SpinningBoxes;