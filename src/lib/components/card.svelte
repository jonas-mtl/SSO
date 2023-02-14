<script>
    export let title = "No Title!";
    export let categorys = [{}];
    import Animator from '$lib/assets/animator.svelte';

    import './card.scss';
</script>

    <div class="card">
        <div class="image">
            <h3>{title}</h3>
        </div>
        <div class="text-container">
            <ul id="categoryList">
                {#each categorys as categoryItem}
                    <li id="listItem">
                        <div class="titleItem">
                            {categoryItem[0]}
                            <hr>
                        </div>
                        <span class="description">{categoryItem[1]}</span>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
