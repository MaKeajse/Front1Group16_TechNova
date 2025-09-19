// Servicios (CRUD en localStorage) + util formato COP
const LS_KEY = 'TECHNOVA_SERVICES';

const DEFAULT_SERVICES = [
  {id:101, nombre:'Desarrollo web', icon:'desarrollo-web.png', precio:2400000, stock:25, en_promocion:true, imagen_url:'', descripcion:'Sitios responsivos (React/Angular) con APIs REST y despliegue en la nube.'},
  {id:102, nombre:'Apps Móviles', icon:'apps-moviles.png',precio:3200000, stock:15, en_promocion:false, imagen_url:'', descripcion:'Apps nativas o híbridas para Android/iOS.'},
  {id:103, nombre:'Consultoría TI', icon:'consultoria-ti.png', precio:2800000, stock:12, en_promocion:false, imagen_url:'', descripcion:'Evaluación, estrategia y roadmap tecnológico.'},
  {id:104, nombre:'Servicios Nube', precio:3600000, stock:10, en_promocion:false, imagen_url:'', descripcion:'Migración a la nube, contenedores y CI/CD.'},
  {id:105, nombre:'IA', precio:4200000, stock:8, en_promocion:true, imagen_url:'', descripcion:'Casos de ML/IA aplicada al negocio.'},
  {id:106, nombre:'Soporte Técnico', precio:900000, stock:50, en_promocion:true, imagen_url:'', descripcion:'Soporte remoto y en sitio 24/7.'},
  {id:107, nombre:'E-Commerce', precio:2600000, stock:18, en_promocion:false, imagen_url:'', descripcion:'Tiendas online y pasarelas de pago.'},
  {id:108, nombre:'UI/UX Design', precio:2200000, stock:20, en_promocion:false, imagen_url:'', descripcion:'Investigación UX, prototipos y pruebas.'},
  {id:109, nombre:'IoT', precio:3000000, stock:14, en_promocion:false, imagen_url:'', descripcion:'Integración de dispositivos y telemetría.'},
  {id:110, nombre:'Desarrollo de APIs', precio:2100000, stock:22, en_promocion:false, imagen_url:'', descripcion:'Diseño e implementación de APIs REST/GraphQL.'}
];

function loadServices(){

  const raw = localStorage.getItem(LS_KEY);

  if(!raw){ 
    localStorage.setItem(LS_KEY, JSON.stringify(DEFAULT_SERVICES)); 
    return [...DEFAULT_SERVICES]; 
  }

  try{ 
    return JSON.parse(raw); 
  }catch{ 
    localStorage.setItem(LS_KEY, JSON.stringify(DEFAULT_SERVICES)); 
    return [...DEFAULT_SERVICES]; 
  }
}

function saveServices(arr){ 
    localStorage.setItem(LS_KEY, JSON.stringify(arr)); 
}

function getService(id){ 
    return loadServices().find(s => String(s.id)===String(id)); 
}

function upsertService(svc){

  const arr = loadServices();

  if(!svc.id){ 
    svc.id = Math.max(...arr.map(s=>s.id)) + 1; arr.push(svc); 
  }else{ 
    const i = arr.findIndex(x => x.id === svc.id); 
    if(i>=0) arr[i]=svc; else arr.push(svc); 
  }
  saveServices(arr); 
  return svc.id;
}
function deleteService(id){ 
    saveServices(loadServices().filter(s => String(s.id)!==String(id))); 
}

function formatMoney(n){ 
    return n.toLocaleString('es-CO', {style:'currency', currency:'COP', maximumFractionDigits:0}); 
}
