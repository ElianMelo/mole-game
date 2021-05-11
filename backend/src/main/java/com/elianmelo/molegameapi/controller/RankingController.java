package com.elianmelo.molegameapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elianmelo.molegameapi.domain.Ranking;
import com.elianmelo.molegameapi.service.RankingService;

@RestController
@RequestMapping("/ranking")
public class RankingController {
	
	@Autowired
	private RankingService service;
	
	@GetMapping
	public List<Ranking> all() {
		return service.todos();
	}
	
	@PostMapping
	public Ranking novo(@RequestBody Ranking ranking) throws Exception {
		
		Integer id = ranking.getUsuario().getId();
		String nivel = ranking.getNivel();
		
		Ranking rankAtual = service.findByUserId(id, nivel);
		
		if(rankAtual != null) {
			if(ranking.getPontos() > rankAtual.getPontos()) {
				return service.atualiza(ranking, rankAtual.getId());
			} else {
				return rankAtual;
			}
		} else {
			return service.novo(ranking);
		}
		
	}
	
	@GetMapping("/{id_user}/{nivel}")
	public Ranking findRankUserId(@PathVariable Integer id_user, @PathVariable String nivel) throws Exception {
		return service.findByUserId(id_user, nivel);
	}
	
	@GetMapping("/{id}")
	public Ranking one(@PathVariable Integer id) throws Exception {
		return service.ranking(id);
	}
	
	@GetMapping("/n={nivel}")
	public List<Ranking> nivel(@PathVariable String nivel) throws Exception {
		return service.nivel(nivel);
	}
	
	@DeleteMapping("/{id}")
	void deleteRanking(@PathVariable Integer id) {
		service.deleteRanking(id);
	}
}
