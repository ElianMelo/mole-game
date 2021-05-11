package com.elianmelo.molegameapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elianmelo.molegameapi.domain.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{

}
