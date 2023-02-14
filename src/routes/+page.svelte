<script>
    import { loadFull } from "tsparticles";
    import { fade } from "svelte/transition";

    import Animator from '$lib/assets/animator.svelte';
    import Card from '$lib/components/card.svelte'
    import Particles from "svelte-particles";
    import './page.scss';

    export let user;

    let particlesUrl = "/addons/particles.json";
    let positionY = 0;

    let onParticlesLoaded = (event) => {
        const particlesContainer = event.detail.particles;
    };

    let particlesInit = async (engine) => {
        await loadFull(engine);
    };

    const pageTransitionDuration = 500;
</script>

<svelte:window bind:scrollY={positionY} />

<main in:fade={{duration: pageTransitionDuration, delay: pageTransitionDuration }} out:fade={{duration: pageTransitionDuration }}>
    <section class="welcome-section">
        <div style="transform: translateY(-{positionY * 0.3}px);" class="welcome-container">
            <h1 style="opacity: {100 - positionY * 0.4 }%;">DEIN CLUB NAME</h1>
            <p style="opacity: {100 - positionY * 0.3 }%;" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum magni eos, dicta ullam placeat laborum quod odit nulla expedita minus suscipit modi sunt, distinctio vel. Sunt cumque voluptate itaque sed nisi, recusandae ipsum reprehenderit qui ab quos earum quo consectetur quibusdam distinctio quas nostrum, omnis et accusantium corrupti sapiente fuga?</p>
            <hr style="opacity: {100 - positionY * 0.3 }%;">
            <div id="button-container" style="opacity: {100 - positionY * 0.2 }%;">
                <a class="learn-more" href="api/auth">
                    <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                    </span>
                    <span class="button-text">Mehr Entdecken</span>
                </a>
            </div>
        </div>
        <div class="particles-ctl" style="opacity: {100 - positionY * 0.3 }%;">
            <Particles  id="tsparticles" url="{particlesUrl}" on:particlesLoaded="{onParticlesLoaded}" particlesInit="{particlesInit}"/>
        </div>
    </section>
    <section class="cards-section">
        <Animator animation={'slide-right 1s cubic-bezier(0.785, 0.135, 0.150, 0.860) both;'} once={true} top={250} bottom={250}>
            <h2>Übersicht</h2>
        </Animator>
        <div class="cards" style="transform: translateX(-{ (positionY - 830) * 0.4 }px);">
            <Card title={"Lorem, ipsum."} categorys={[["Lorem. ", "Lorem, ipsum dolor."], ["Lorem, ipsum. ", "Lorem, ipsum dolor."], ["Lorem. ", "Lorem ipsum dolor sit."]]}/>
            <Card style="overflow-y: hidden;" title={"Lorem."} categorys={[["Leitung", "Lorem, ipsum dolor."], ["Leitung", "Lorem, ipsum dolor."], ["Leitung", "Lorem, ipsum dolor."]]}/>
            <Card style="overflow-y: hidden;" title={"Lorem, ipsum."} categorys={[["Leitung", "Lorem, ipsum dolor."], ["Leitung", "Lorem, ipsum dolor."], ["Leitung", "Lorem, ipsum dolor."]]}/>
        </div>
        <br>
    </section>

    <section class="application-section">
        <img src="/images/svg/top-wave.svg" alt="wave">
        <div class="application-container">
            <h2>Werde jetzt Mitglied im Club!</h2>
            <div class="application-cards">
                <div class="card-text">
                    <h2>Bewerbung</h2>
                    <h3>Lorem ipsum dolor sit.</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum dolorem recusandae quasi autem eius nemo illum iure ducimus molestiae. Repellendus consectetur officiis dolores repudiandae possimus minima eos, tempore commodi, impedit cum facere sit. Deleniti omnis soluta quisquam adipisci maiores error voluptatem eum sequi nemo ducimus inventore, quaerat veniam, distinctio magni?</p>
                    <a href="/api/auth">Jetzt bewerben!</a>
                </div>
                <img src="/images/wallpapers/discord.png" alt="discord">
            </div>
        </div>
        <img src="/images/svg/bottom-wave.svg" alt="wave">
    </section>
</main>

<style>
    @keyframes -global-slide-right {
        0% {
            -webkit-transform: translateX(-300px);
                    transform: translateX(-300px);
                    opacity: 0;
        }
        100% {
            -webkit-transform: translateX(0px);
                    transform: translateX(0px);
                    opacity: 1;
        }
    }
</style>