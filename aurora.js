/* ======================================
   AURORA SHADER OVERLAY
====================================== */

const auroraScene = new THREE.Scene();

const auroraCamera = new THREE.OrthographicCamera(
  -1,1,1,-1,0,1
);

const auroraRenderer = new THREE.WebGLRenderer({alpha:true});
auroraRenderer.setSize(window.innerWidth,window.innerHeight);
auroraRenderer.domElement.style.position="fixed";
auroraRenderer.domElement.style.top=0;
auroraRenderer.domElement.style.left=0;
auroraRenderer.domElement.style.zIndex="-3";

document.body.appendChild(auroraRenderer.domElement);


/* Shader */

const material = new THREE.ShaderMaterial({

uniforms:{
  time:{value:0}
},

vertexShader:`
  void main(){
    gl_Position=vec4(position,1.0);
  }
`,

fragmentShader:`

uniform float time;

void main(){

  vec2 uv=gl_FragCoord.xy/vec2(1920.0,1080.0);

  float wave=
    sin(uv.y*6.0 + time*0.6) +
    sin(uv.y*12.0 - time*0.4);

  float glow=smoothstep(0.4,0.8,wave);

  vec3 color=
    mix(
      vec3(0.1,0.2,0.5),
      vec3(0.4,0.0,0.7),
      glow
    );

  gl_FragColor=vec4(color*0.6,0.25);
}
`
});

const quad = new THREE.Mesh(
  new THREE.PlaneGeometry(2,2),
  material
);

auroraScene.add(quad);


/* Animate */

function auroraLoop(){

  material.uniforms.time.value += 0.01;

  auroraRenderer.render(
    auroraScene,
    auroraCamera
  );

  requestAnimationFrame(auroraLoop);
}

auroraLoop();
