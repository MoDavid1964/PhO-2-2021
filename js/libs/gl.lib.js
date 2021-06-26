/*
    A library of utility functions for drawing
    and doing stuff to canvases using the webgl
    rendering context.
*/

const GL = (function(){

    // Sets up the context object
    let GL = {};
    let cnv = null;
    let gl = null;

    // Some webgl stuff
    let attributes = {};
    let uniforms = {};
    let buffers = {};
    let textures = {};

    // Specifies which canvas to use
    GL.useCanvas = function(canvas){
        cnv = canvas;

        // Check webgl support
        if(!(gl = cnv.getContext("webgl")))
            if(!(gl = cnv.getContext("webgl-experimental")))
                console.error("WebGL not supported why tho.");

        // Specifies the size of the canvas
        gl.viewport(0, 0, cnv.width, cnv.height);
    }

    GL.width = function(){
        return cnv.width;
    }

    GL.height = function(){
        return cnv.height;
    }

    // Initialization functions
    GL.createShader = function(type, source){

        if(type == "v" || type == "vert" || type == "vertex") 
            type = gl.VERTEX_SHADER;
        if(type == "f" || type == "frag" || type == "fragment") 
            type = gl.FRAGMENT_SHADER;

        // Create and compile the shader
        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
            
            // Log the error and delete the shader
            console.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return;
        }

        return shader;
    }

    GL.createProgram = function(shaders){

        // In case input are shader sources and not shaders
        if(shaders.vertex != "none")
            if(typeof shaders.vertex == "string") 
                shaders.vertex = GL.createShader("v", shaders.vertex);
        if(shaders.fragment != "none")
            if(typeof shaders.fragment == "string") 
                shaders.fragment = GL.createShader("f", shaders.fragment);

        // Create program
        let program = gl.createProgram();
        if(shaders.vertex != "none")
            gl.attachShader(program, shaders.vertex);
        if(shaders.fragment != "none")
            gl.attachShader(program, shaders.fragment);
        gl.linkProgram(program);

        if(!gl.getProgramParameter(program, gl.LINK_STATUS)){

            // Log the error and delete the program
            console.error(gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return;
        }

        return program;
    }

    GL.getAttribute = function(program, attribute){

        // In case it hasnt been taken yet
        if(!attributes[attribute]){
            attributes[attribute] = {
                location: gl.getAttribLocation(program, attribute)
            }
        }

        return attributes[attribute].location;
    }

    GL.getUniform = function(program, uniform){

        // In case it hasnt been taken yet
        if(!uniforms[uniform]){
            uniforms[uniform] = {
                location: gl.getUniformLocation(program, uniform)
            }
        }

        return uniforms[uniform].location;
    }

    GL.setBufferData = function(attribute, data){
        // Buffer for passing data to the gpu
        // Note that attribute is the associated attribute with the buffer 
        let buffer = gl.createBuffer();
        buffers[attribute] = buffer;

        // Binds buffer then populates it with the given data
        // It only binds it so it can be populated
        GL.bindArrayBuffer(attribute);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    }

    GL.setTextureData = function(tex_id, data){
        // Texture for passing data to the gpu
        // Note that tex_id is the name of the associated texture with the data
        let texture = gl.createTexture();
        textures[tex_id] = texture;

        // Binds buffer then populates it with the given data
        // It only binds it so it can be populated
        GL.bindTexture2D(tex_id);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
    }

    // Drawing and updating functions
    GL.bindArrayBuffer = function(attribute){
        // Sets the current bound array buffer on the global bind point
        // Note that attribute is the associated attribute with the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers[attribute]);
    }

    GL.bindTexture2D = function(tex_id){
        // Sets the current bound texture 2d on the global bind point
        // Note that tex_id is the name of associated texture with the buffer
        gl.bindTexture(gl.TEXTURE_2D, textures[tex_id]);

        // Set default configuration
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    }

    GL.passAttributeData = function(program, attribute, params){
        // Passes the current active buffer to the respective attribute
        // Enable the attribute
        gl.enableVertexAttribArray(GL.getAttribute(program, attribute));

        // Bind current array buffer to attribute
        gl.vertexAttribPointer(GL.getAttribute(program, attribute), 
            params.size, gl.FLOAT, params.norm, params.stride, params.offset);
    }

    GL.passUniformData = function(program, uniform, type, data){
        // Passes data to the specified uniform
        switch(type){
            case "vec1":
                gl.uniform1fv(GL.getUniform(program, uniform), data);
                break;
            case "vec2":
                gl.uniform2fv(GL.getUniform(program, uniform), data);
                break;
            case "vec3":
                gl.uniform3fv(GL.getUniform(program, uniform), data);
                break;
            case "vec4":
                gl.uniform4fv(GL.getUniform(program, uniform), data);
                break;
            case "mat2":
                gl.uniformMatrix2fv(GL.getUniform(program, uniform), data);
                break;
            case "mat3":
                gl.uniformMatrix3fv(GL.getUniform(program, uniform), data);
                break;
            case "mat4":
                gl.uniformMatrix4fv(GL.getUniform(program, uniform), data);
                break;
        }
    }

    GL.clear = function(){

        // Clear the different buffers
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    };

    GL.use = function(program){
        gl.useProgram(program);
    }

    GL.render = function(params){
        gl.drawArrays(gl.TRIANGLES, params.offset, params.count);
    }

    return GL;
})();