package com.elianmelo.molegameapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elianmelo.molegameapi.domain.Usuario;
import com.elianmelo.molegameapi.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
	
	@Autowired
	private UsuarioService service;
	
	@GetMapping
	public List<Usuario> all() {
		return service.todos();
	}
	
	@PostMapping
	public Usuario novo(@RequestBody Usuario usuario) {
		return service.novo(usuario);
	}
	
	@GetMapping("/{id}")
	public Usuario one(@PathVariable Integer id) throws Exception {
		return service.usuario(id);
	}
	
	@PutMapping("/{id}")
	public Usuario replaceUsuario(@RequestBody Usuario usuario, @PathVariable Integer id) {
		return service.atualiza(usuario, id);
	}
	
	@DeleteMapping("/{id}")
	void deleteUsuario(@PathVariable Integer id) {
		service.deleteUsuario(id);
	}
}
