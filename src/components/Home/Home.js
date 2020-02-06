import React from 'react';
import './Home.css';
import {API_URL,API_KEY,IMAGE_BASE_URL,POSTER_SIZE,BACKDROP_SIZE} from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';

class Home extends React.Component{
    state={
        movies:[],
        HeroImage:null,
        loading:false,
        currentPage:0,
        totalPages:0,
        SearchTerm:''
    };


    componentDidMount(){
        this.setState({loading:true});
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endPoint)
    }

    loadMoreItem = ()=>{
        let endPoint='';
        this.setState({
            loading:true
        });

         if(this.setState.SearchTerm===''){
             endPoint= `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage+1}`;
             
         }else {
             endPoint=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&query${this.state.SearchTerm}&page=${this.state.currentPage+1}`;
         }
              
         this.fetchItems(endPoint);

    }

    fetchItems=(endPoint)=>{
        fetch(endPoint)
        .then(result=>result.json())
        .then(response=>{
            console.log(response);
            this.setState({
                movies:[...this.state.movies,...response.results],
                HeroImage: this.state.HeroImage || response.results[0],
                loading:false,
                currentPage:response.page,
                totalPages:response.total_pages
            });
        })
    }

    render(){
        return(
            <div className="rmdb-home">
                <HeroImage/>
                <SearchBar/>
                <FourColGrid/>
                <Spinner/>
                <LoadMoreBtn/>
            </div>
        );
    }
}

export default Home