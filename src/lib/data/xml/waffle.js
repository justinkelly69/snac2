const xml = () => `
<fo:breakfast_menu xmlns="http://br.com" xmlns:fo="http://fo.com" xmlns:co="http://co.com" 
chef="&lt;ooohlala&amp;&gt;">
    the food starts here
    <fo:food co:nationality="BE" id="x999" class="noclass">
        <name>Belgian Waffles</name>
        <?php
        $name="James P. Sullivan XXXVIII";
        for($i = 0; $i < SIZE_OF_MEMORY; $i++){
            deleteMemory($i);
        } ?>
        <price co:currency="USD" curse="fuck off" fo:bs="bullshit">$5.95</price>
        <description class="longtext">
        <!-- THIS IS A NICE COMMENT !!!! -->
   Two of our &lt;famous&gt; Belgian &quot;Waffles&quot; &amp; &apos;with&apos; plenty of real maple syrup
        </description>
        <![CDATA[This is CDATA <html name="&&&value'''">]]>
        <calories multiply="1000">650</calories>
    </fo:food>
    that was all the food
</fo:breakfast_menu>
`;

export default xml;
