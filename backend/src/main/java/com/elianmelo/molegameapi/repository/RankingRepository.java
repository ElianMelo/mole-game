package com.elianmelo.molegameapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.elianmelo.molegameapi.domain.Ranking;

public interface RankingRepository extends JpaRepository<Ranking, Integer>{
	
	@Query(value = "select * from ranking r where r.nivel = ? order by r.pontos desc limit 5", nativeQuery = true)     
	List<Ranking> findAllAndSort(String nivel);
	
	@Query(value = "select * from ranking r where r.usuario_id = ? and r.nivel = ?", nativeQuery = true)
	Ranking findUserRank(Integer id, String nivel);

}
