package com.elianmelo.molegameapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.elianmelo.molegameapi.domain.Ranking;
import com.elianmelo.molegameapi.repository.RankingRepository;

@Service
public class RankingService {
	
	@Autowired
	RankingRepository repository;
	
	public List<Ranking> todos() {
		return repository.findAll();
	}
	
	public Ranking novo(Ranking ranking) {
		return repository.save(ranking);
	}
	
    public Ranking ranking(Integer id) throws Exception {
        return repository.findById(id).orElseThrow(() -> new Exception("exceção"));
    }
    
    public List<Ranking> nivel(String nivel) throws Exception {
        return repository.findAllAndSort(nivel);
    }
    
    public Ranking findByUserId(Integer id, String nivel) throws Exception {
        return repository.findUserRank(id, nivel);
    }

    public Ranking atualiza(Ranking ranking, Integer id) {
        ranking.setId(id);
        return repository.save(ranking);
	}

	public void deleteRanking(@PathVariable Integer id) {
	        repository.deleteById(id);
	}
	
}
