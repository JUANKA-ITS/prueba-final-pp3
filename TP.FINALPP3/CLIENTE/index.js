const app = new Vue({

    el:"#principal",
    
data:{
    
    id_host:null,
    hostname:null,
    dir_ip:null,
    fecha_carga:'',
    cliente:'',
    id_cliente:null,
    razon_social:'',
    nombre:'',
    apellido:'',
    telefono:'',
    correo_electronico:'',
    equipos_busqueda:'',
    clientes_busqueda:'',
    lista_clientes:[],
    lista_equipos:[],

    cpu_valor:null,
    estado_cpu:'',
    ram_io_total:null,
    ram_io_usada:null,
    ram_io_free:null,
    ram_io_porc:null,
    estado_ram_io:null,
    trafico_en:null,
    trafico_sa:null,
    red:'',
},
    
methods:{


    capturarCpu() {

        const socket = io('http://localhost:3030');

        socket.on('cpu', (info) => {

            this.cpu_valor = info;

            if(this.cpu_valor > 80){
                this.estado_cpu = "Uso Excesivo";
            }else{
                this.estado_cpu = "Uso Normal de CPU"; 
            }

        });
    },

    capturarram(){

        const socket = io('http://localhost:3030');

        socket.on('ram', (data) => {

            this.ram_io_total = data.totalMemMb;
            this.ram_io_usada = data.usedMemMb;
            this.ram_io_free = data.freeMemMb;
            this.ram_io_porc = data.freeMemPercentage;

            if(this.ram_io > 0.5){
                this.estado_ram_io = "Uso Excesivo";
            }else{
                this.estado_ram_io = "Uso Normal de M.RAM"
            }

        });
    },

    capturartrafico()
    {
        const socket = io('http://localhost:3030');
        socket.on('red', (total) => {
            this.red = total[0].interface;
            this.trafico_en = total[0].inputBytes/1024;
            this.trafico_sa = total[0].outputBytes/1024;
        });

    },

    
    borrarDatos()
    {
        this.id_host = '';
        this.hostname = '';
        this.dir_ip= '';
        this.fecha_carga = '';
        this.cliente = '';
        this.id_cliente = '';
        this.razon_social = '';
        this.nombre = '';
        this.apellido = '';
        this.telefono = '';
        this.correo_electronico = '';
    },
    
    listarequipos(){
    
    axios.get('http://localhost:3000/equipo').then(resultado => {
    
    this.lista_equipos = resultado.data;
    
    });
    
    },
    
    
    eliminarequipos(codigo_id_host){
    
        axios.delete('http://localhost:3000/equipo/'+codigo_id_host).then( resultado => {
        alert('resultado.data');
        this.listarequipos();
    });
    },
    
    guardarequipos()
    {
        let unequipos = {
        hostname: this.hostname,
        dir_ip: this.dir_ip,
        fecha_carga: this.fecha_carga,
        cliente: this.cliente,
    }
    axios.post('http://localhost:3000/equipo',unequipos).then( resultado => {
        alert(resultado.data);
        this.listarequipos();
        console.log(resultado);
        this.borrarDatos();
        
    });
    
    },
    
    buscarequipos()
    {
        axios.get('http://localhost:3000/equipo/'+this.equipos_busqueda).then( resultado => {
        this.lista_equipos = resultado.data;
    });
    },
    
    editarequipos(hostname,dir_ip,fecha_carga,cliente){
    
        this.hostname = hostname;
        this.dir_ip = dir_ip;
        this.fecha_carga = fecha_carga;
        this.cliente = cliente;
        
    
    },
    
    async actualizarequipos(){
        let unequipos = {
            hostname: this.hostname,
            dir_ip: this.dir_ip,
            fecha_carga: this.fecha_carga,
            cliente: this.cliente,
            
    }
    await axios.put('http://localhost:3000/equipo/'+this.id_host,unequipos).then( resultado => {
    
        //alert(resultado.data);
        this.listarequipos();
        this.borrarDatos();
    });
    
    },

    listarclientes(){
    
        axios.get('http://localhost:3000/cliente').then(resultado => {
        
        this.lista_clientes = resultado.data;
        
        });
        
        },
        
        eliminarclientes(id_cliente){
        
            axios.delete('http://localhost:3000/cliente/'+id_cliente).then( resultado => {
            alert(resultado.data);
            this.listarclientes();
        });
        },
        
        guardarclientes()
        {
            let unclientes = {
            razon_social: this.razon_social,
            nombre: this.nombre,
            apellido: this.apellido,
            telefono: this.telefono,
            correo_electronico: this.correo_electronico,
        }
        axios.post('http://localhost:3000/cliente',unclientes).then( resultado => {
            alert(resultado.data);
            this.listarclientes();
            console.log(resultado);
            this.borrarDatos();
            
        });
        
        },
        
        buscarclientes()
        {
            axios.get('http://localhost:3000/cliente/'+this.clientes_busqueda).then( resultado => {
            this.lista_clientes = resultado.data;
        });
        },
        
        editarclientes(razon_social,nombre,apellido,correo_electronico, telefono){
        
            this.razon_social = razon_social;
            this.nombre = nombre;
            this.apellido = apellido;
            this.correo_electronico = correo_electronico;
            this.telefono = telefono;
    
        },
        
        actualizarclientes(){
            let unclientes = {
                razon_social: this.razon_social,
                nombre: this.nombre,
                apellido: this.apellido,
                correo_electronico: this.correo_electronico,
                telefono: this.telefono
                
            }
            axios.put('http://localhost:3000/cliente/'+this.id_cliente,unclientes).then( resultado => {
        
            //alert(resultado.data);
            this.listarclientes();
            this.borrarDatos();
        });
        
        }

    
    },

    mounted(){
        
        $(document).ready(function(){
            $('.tabs').tabs();
        });
    },
    
    
    created:function() 
    
        {
        this.listarequipos();
        this.listarclientes();
        this.capturarCpu();
        this.capturarram();
        this.capturartrafico();
    },

    
    });