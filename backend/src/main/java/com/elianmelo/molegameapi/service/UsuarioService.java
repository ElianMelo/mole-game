package com.elianmelo.molegameapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.elianmelo.molegameapi.domain.Usuario;
import com.elianmelo.molegameapi.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	UsuarioRepository repository;
	
	public List<Usuario> todos() {
		return repository.findAll();
	}
	
	public Usuario novo(Usuario usuario) {
		return repository.save(usuario);
	}
	
    public Usuario usuario(Integer id) throws Exception {
        return repository.findById(id).orElseThrow(() -> new Exception("exceção"));
    }

    public Usuario atualiza(Usuario usuario, Integer id) {
        usuario.setId(id);
        return repository.save(usuario);
	}

	public void deleteUsuario(@PathVariable Integer id) {
		repository.deleteById(id);
	}
	
}
